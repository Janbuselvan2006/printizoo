import React from 'react';
import { useApp } from '../context/AppContext';
import { groceryCategories, rentalCategories } from '../data/categories';

export default function CategoryScroll() {
  const { currentTab, selectedCategory, setSelectedCategory } = useApp();

  const categories = currentTab === 'grocery' ? groceryCategories : rentalCategories;

  return (
    <div className="category-scroll-container">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`category-pill-btn ${isActive ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className="category-icon-box">{cat.icon}</div>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
