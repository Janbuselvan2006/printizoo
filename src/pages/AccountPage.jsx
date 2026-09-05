import React from 'react';
import {
  User,
  ShoppingBag,
  MapPin,
  HelpCircle,
  LogOut,
  ChevronRight,
  LogIn,
  Package,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AccountPage() {
  const {
    user,
    logout,
    setIsLoginModalOpen,
    orders,
    location,
    setIsLocationModalOpen,
    navigateTo,
    showToast,
    addToCart
  } = useApp();

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.type, item.duration);
    });
    showToast('Items added to cart! 🛒');
    navigateTo('cart');
  };

  return (
    <div className="page-screen" style={{ paddingBottom: 40 }}>
      {/* Profile Card */}
      <div className="profile-hero">
        <div className="profile-avatar">
          <User size={36} />
        </div>

        {user ? (
          <>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, marginBottom: 4 }}>
              {user.name}
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: 14 }}>
              +91 {user.phone} • Member since {user.joinedDate || '2026'}
            </p>
            <button
              onClick={logout}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'var(--white)',
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, marginBottom: 4 }}>
              Welcome to PrintiZoo!
            </h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: 16 }}>
              Login to track your 10-minute grocery orders & manage rentals
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                background: 'var(--secondary)',
                border: 'none',
                color: 'var(--dark)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <LogIn size={16} /> Login / Register
            </button>
          </>
        )}
      </div>

      {/* Recent Orders Section */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div className="section-head">
          <h3 className="section-title">Your Order History</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 700 }}>
            {orders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--gray-200)',
              padding: 24,
              textAlign: 'center',
              color: 'var(--gray-500)'
            }}
          >
            <Package size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>No previous orders found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--gray-200)',
                  padding: 14,
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Order #{order.id}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                    </div>
                  </div>
                  <span
                    style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary-dark)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {order.status || 'Delivered'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-100)', paddingTop: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--gray-900)' }}>
                    ₹{order.totals?.grandTotal}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => navigateTo('track')}
                      style={{
                        background: 'var(--gray-100)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Track
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      style={{
                        background: 'var(--primary)',
                        color: 'var(--white)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menu Options Group */}
      <div className="menu-group">
        <button className="menu-btn" onClick={() => setIsLocationModalOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPin size={18} color="var(--primary)" />
            <span>Saved Delivery Addresses</span>
          </div>
          <ChevronRight size={18} color="var(--gray-400)" />
        </button>

        <button
          className="menu-btn"
          onClick={() => showToast('Connecting to 24/7 Live Support... 💬')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <HelpCircle size={18} color="var(--primary)" />
            <span>Help & Customer Support</span>
          </div>
          <ChevronRight size={18} color="var(--gray-400)" />
        </button>

        <button
          className="menu-btn"
          onClick={() => showToast('PrintiZoo v2.0 React Edition ⚡')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>About PrintiZoo & Safety Guarantee</span>
          </div>
          <ChevronRight size={18} color="var(--gray-400)" />
        </button>
      </div>
    </div>
  );
}
