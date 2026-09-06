import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { groceryProducts, rentalProducts } from '../data/products';
import { auth, db } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTab, setCurrentTab] = useState('grocery'); // 'grocery' | 'rental'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // User State (persisted)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('printizoo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Location State (persisted)
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('printizoo_location');
      return saved
        ? JSON.parse(saved)
        : {
            address: '12 Gandhi Road, Anna Nagar',
            area: 'Chennai',
            tag: 'Home',
            eta: '10 Mins'
          };
    } catch {
      return {
        address: '12 Gandhi Road, Anna Nagar',
        area: 'Chennai',
        tag: 'Home',
        eta: '10 Mins'
      };
    }
  });

  // Cart State (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('printizoo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders History & Active Order (persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('printizoo_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('printizoo_current_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('printizoo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('printizoo_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('printizoo_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('printizoo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('printizoo_current_order', JSON.stringify(currentOrder));
  }, [currentOrder]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Navigation
  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Actions
  const addToCart = (product, type = 'grocery', duration = 3) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id && item.type === type);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1
        };
        showToast(`Increased quantity of ${product.name} 🛒`);
        return updated;
      } else {
        let discountMultiplier = 1;
        if (type === 'rental') {
          if (duration === 3) discountMultiplier = 0.95;
          if (duration === 6) discountMultiplier = 0.90;
          if (duration === 12) discountMultiplier = 0.85;
        }

        const effectivePrice =
          type === 'rental'
            ? Math.round(product.monthlyPrice * discountMultiplier)
            : product.price;

        const newItem = {
          ...product,
          type,
          qty: 1,
          duration: type === 'rental' ? duration : undefined,
          effectivePrice: effectivePrice
        };
        showToast(`Added ${product.name} to cart! 🎉`);
        return [...prev, newItem];
      }
    });
  };

  const updateQty = (productId, delta, type = 'grocery') => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId && item.type === type) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, type = 'grocery') => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.type === type)));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const itemTotal = cart.reduce((sum, item) => {
    const price = item.type === 'rental' ? item.effectivePrice : item.price;
    return sum + price * item.qty;
  }, 0);

  const totalMrp = cart.reduce((sum, item) => {
    const mrp = item.type === 'rental' ? item.monthlyPrice : (item.mrp || item.price);
    return sum + mrp * item.qty;
  }, 0);

  const totalSavings = Math.max(0, totalMrp - itemTotal);
  const deliveryFee = itemTotal === 0 ? 0 : itemTotal >= 199 ? 0 : 25;
  const handlingFee = itemTotal === 0 ? 0 : 5;
  const grandTotal = itemTotal + deliveryFee + handlingFee;

  // Redirect based on user role
  const redirectUserByRole = (role) => {
    switch (role) {
      case 'admin':
        navigateTo('admin-dashboard');
        break;
      case 'store':
        navigateTo('store-dashboard');
        break;
      case 'delivery':
        navigateTo('delivery-dashboard');
        break;
      default:
        navigateTo('home');
        break;
    }
  };

  // Firebase Auth Listener & Firestore Role Sync
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);

          let userRole = 'user';
          let userName = fbUser.displayName || fbUser.email?.split('@')[0] || 'User';

          if (userSnap.exists()) {
            const data = userSnap.data();
            userRole = data.role || 'user';
            userName = data.name || userName;
          }

          const userObj = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: userName,
            role: userRole,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          };

          setUser(userObj);
        } catch {
          // If Firestore fails (e.g. invalid credentials or network issue), fallback gracefully
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.email?.split('@')[0] || 'User',
            role: 'user'
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Firebase Email/Password Login
  const firebaseLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      let userRole = 'user';
      let userName = fbUser.displayName || email.split('@')[0];

      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          userRole = userSnap.data().role || 'user';
          userName = userSnap.data().name || userName;
        }
      } catch {
        // Fallback role
      }

      const loggedInUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        name: userName,
        role: userRole
      };

      setUser(loggedInUser);
      setIsLoginModalOpen(false);
      showToast(`Welcome back, ${userName}! 👋 (${userRole.toUpperCase()} Login)`);
      redirectUserByRole(userRole);
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
      return { success: false, error: err.message };
    }
  };

  // Firebase Registration with Firestore Role Creation
  const firebaseSignUp = async (email, password, name, role = 'user') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      const newUserDoc = {
        uid: fbUser.uid,
        email,
        name,
        role,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', fbUser.uid), newUserDoc);
      } catch {
        // Safe fallback if Firestore write permissions fail
      }

      const userObj = {
        uid: fbUser.uid,
        email,
        name,
        role
      };

      setUser(userObj);
      setIsLoginModalOpen(false);
      showToast(`Account created as ${role.toUpperCase()}! 🎉`);
      redirectUserByRole(role);
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
      return { success: false, error: err.message };
    }
  };

  // Demo / Quick Role Switch for Testing
  const loginWithRole = (role, name = '') => {
    const demoNames = {
      admin: 'Master Admin',
      store: 'Anna Nagar Store Manager',
      delivery: 'Rider Partner Express',
      user: name || 'Demo Shopper'
    };

    const newUser = {
      uid: 'demo-' + role + '-' + Date.now(),
      name: demoNames[role] || name || 'Demo User',
      role: role,
      phone: '9876543210',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setUser(newUser);
    setIsLoginModalOpen(false);
    showToast(`Logged in as ${role.toUpperCase()} ⚡`);
    redirectUserByRole(role);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // safe fallback
    }
    setUser(null);
    navigateTo('home');
    showToast('Logged out successfully');
  };

  // Order Placement
  const placeOrder = (orderDetails) => {
    const orderId = 'PZ' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      items: [...cart],
      totals: {
        itemTotal,
        deliveryFee,
        handlingFee,
        grandTotal,
        totalSavings
      },
      shipping: {
        address: orderDetails.address || location.address,
        phone: orderDetails.phone || user?.phone || '9876543210',
        paymentMethod: orderDetails.paymentMethod || 'cash',
        note: orderDetails.note || ''
      },
      status: 'On the way',
      timelineStep: 3, // 1: Placed, 2: Packed, 3: On The Way, 4: Delivered
      estimatedMins: 10,
      createdAt: new Date().toISOString()
    };

    setCurrentOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    navigateTo('success');
  };

  return (
    <AppContext.Provider
      value={{
        // Nav & Views
        currentPage,
        navigateTo,
        currentTab,
        setCurrentTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,

        // Modals
        isLocationModalOpen,
        setIsLocationModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,

        // Cart
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalCartItems,
        itemTotal,
        totalMrp,
        totalSavings,
        deliveryFee,
        handlingFee,
        grandTotal,

        // Auth
        user,
        logout,
        firebaseLogin,
        firebaseSignUp,
        loginWithRole,

        // Location
        location,
        setLocation,

        // Orders
        orders,
        currentOrder,
        placeOrder,

        // Toast
        toastMessage,
        showToast,

        // Raw Catalogs
        groceryProducts,
        rentalProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
