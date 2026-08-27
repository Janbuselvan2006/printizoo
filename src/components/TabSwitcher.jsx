import React from 'react';
import { Zap, Armchair } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TabSwitcher() {
  const { currentTab, setCurrentTab, setSelectedCategory } = useApp();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSelectedCategory('all');
  };

  return (
    <div className="tab-switcher">
      <button
        className={`tab-btn ${currentTab === 'grocery' ? 'active' : ''}`}
        onClick={() => handleTabChange('grocery')}
      >
        <Zap size={16} fill={currentTab === 'grocery' ? '#F5C518' : 'none'} />
        <span>10-Min Groceries</span>
        <span className="tab-pill-badge">FAST</span>
      </button>

      <button
        className={`tab-btn ${currentTab === 'rental' ? 'active rental-mode' : ''}`}
        onClick={() => handleTabChange('rental')}
      >
        <Armchair size={16} />
        <span>Rent Furniture & Tech</span>
      </button>
    </div>
  );
}
