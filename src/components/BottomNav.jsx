import React from 'react';
import { Home, LayoutGrid, Armchair, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { currentPage, navigateTo, totalCartItems, currentTab, setCurrentTab } = useApp();

  // Hide bottom nav during checkout, order success and live tracking for clean flow
  if (['checkout', 'success'].includes(currentPage)) {
    return null;
  }

  const handleGoToRentals = () => {
    setCurrentTab('rental');
    navigateTo('home');
  };

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-link-btn ${currentPage === 'home' && currentTab === 'grocery' ? 'active' : ''}`}
        onClick={() => {
          setCurrentTab('grocery');
          navigateTo('home');
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={`nav-link-btn ${currentPage === 'categories' ? 'active' : ''}`}
        onClick={() => navigateTo('categories')}
      >
        <LayoutGrid size={20} />
        <span>Categories</span>
      </button>

      <button
        className={`nav-link-btn ${currentPage === 'home' && currentTab === 'rental' ? 'active' : ''}`}
        onClick={handleGoToRentals}
      >
        <Armchair size={20} />
        <span>Rentals</span>
      </button>

      <button
        className={`nav-link-btn ${currentPage === 'cart' ? 'active' : ''}`}
        onClick={() => navigateTo('cart')}
      >
        <ShoppingBag size={20} />
        <span>Cart</span>
        {totalCartItems > 0 && <span className="nav-cart-badge">{totalCartItems}</span>}
      </button>

      <button
        className={`nav-link-btn ${currentPage === 'account' ? 'active' : ''}`}
        onClick={() => navigateTo('account')}
      >
        <User size={20} />
        <span>Account</span>
      </button>
    </nav>
  );
}
