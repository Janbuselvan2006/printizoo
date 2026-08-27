import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LocationModal from './components/LocationModal';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AccountPage from './pages/AccountPage';

function AppContent() {
  const { currentPage } = useApp();

  const renderActiveScreen = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'success':
        return <OrderSuccessPage />;
      case 'track':
        return <TrackOrderPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  // Keep top header clean on direct flow subpages
  const showMainHeader = ['home'].includes(currentPage);

  return (
    <div className="app-viewport">
      <div className="app-wrapper">
        {showMainHeader && <Header />}
        
        <main>{renderActiveScreen()}</main>

        <BottomNav />
        <LocationModal />
        <LoginModal />
        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
