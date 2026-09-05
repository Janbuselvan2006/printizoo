import React from 'react';
import { ArrowLeft, Zap, Armchair } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { groceryCategories, rentalCategories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import RentalCard from '../components/RentalCard';

export default function CategoriesPage() {
  const {
    currentTab,
    setCurrentTab,
    selectedCategory,
    setSelectedCategory,
    groceryProducts,
    rentalProducts,
    navigateTo
  } = useApp();

  const categories = currentTab === 'grocery' ? groceryCategories : rentalCategories;

  const currentProducts =
    currentTab === 'grocery'
      ? groceryProducts.filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
      : rentalProducts.filter((p) => selectedCategory === 'all' || p.category === selectedCategory);

  return (
    <div className="page-screen">
      <div className="page-top-bar">
        <button className="page-back-btn" onClick={() => navigateTo('home')} aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <h2 className="page-heading">All Categories</h2>
      </div>

      {/* Mode Selector */}
      <div style={{ padding: '12px 16px 0' }}>
        <div className="tab-switcher" style={{ position: 'static', padding: 0, border: 'none' }}>
          <button
            className={`tab-btn ${currentTab === 'grocery' ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('grocery');
              setSelectedCategory('all');
            }}
          >
            <Zap size={15} /> Groceries
          </button>
          <button
            className={`tab-btn ${currentTab === 'rental' ? 'active rental-mode' : ''}`}
            onClick={() => {
              setCurrentTab('rental');
              setSelectedCategory('all');
            }}
          >
            <Armchair size={15} /> Rentals
          </button>
        </div>
      </div>

      {/* Horizontal Category Selectors */}
      <div className="category-scroll-container" style={{ position: 'static' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className="category-icon-box">{cat.icon}</div>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Category Header */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>
          {selectedCategory === 'all'
            ? `All ${currentTab === 'grocery' ? 'Groceries' : 'Rentals'}`
            : categories.find((c) => c.id === selectedCategory)?.name || 'Category'}
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 700 }}>
          {currentProducts.length} items
        </span>
      </div>

      {/* Products Grid */}
      <div className="product-section">
        {currentTab === 'grocery' ? (
          <div className="product-grid">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rental-list">
            {currentProducts.map((p) => (
              <RentalCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
