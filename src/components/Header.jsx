import React from 'react';
import { Zap, MapPin, ChevronDown, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const {
    location,
    setIsLocationModalOpen,
    totalCartItems,
    navigateTo,
    user,
    setIsLoginModalOpen
  } = useApp();

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-section">
          <div className="brand-logo" onClick={() => navigateTo('home')}>
            <Zap className="brand-bolt" size={22} fill="#F5C518" />
            <span>PRINTIZOO</span>
          </div>
          <button
            className="location-pill"
            onClick={() => setIsLocationModalOpen(true)}
            aria-label="Select delivery location"
          >
            <MapPin size={13} color="#F5C518" />
            <span>{location.tag}: {location.address.slice(0, 16)}...</span>
            <ChevronDown size={12} />
          </button>
        </div>

        <div className="header-actions">
          <button
            className="header-icon-btn"
            onClick={() => (user ? navigateTo('account') : setIsLoginModalOpen(true))}
            aria-label="User Account"
          >
            <User size={19} />
          </button>

          <button
            className="header-icon-btn"
            onClick={() => navigateTo('cart')}
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} />
            {totalCartItems > 0 && (
              <span className="cart-counter-badge">{totalCartItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
