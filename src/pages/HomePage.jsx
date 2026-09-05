import React from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import TabSwitcher from '../components/TabSwitcher';
import CategoryScroll from '../components/CategoryScroll';
import PromoBanner from '../components/PromoBanner';
import ProductCard from '../components/ProductCard';
import RentalCard from '../components/RentalCard';

export default function HomePage() {
  const {
    currentTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    groceryProducts,
    rentalProducts,
    navigateTo
  } = useApp();

  // Search Filtering
  const isSearching = searchQuery.trim().length > 0;

  const filteredGroceries = groceryProducts.filter((p) => {
    const matchesSearch =
      !isSearching ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredRentals = rentalProducts.filter((p) => {
    const matchesSearch =
      !isSearching ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-screen">
      <SearchBar />
      <TabSwitcher />
      <CategoryScroll />
      <PromoBanner />

      {/* SEARCH MODE */}
      {isSearching && (
        <section className="product-section">
          <div className="section-head">
            <h3 className="section-title">Search Results for "{searchQuery}"</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
              {currentTab === 'grocery' ? filteredGroceries.length : filteredRentals.length} items found
            </span>
          </div>

          {currentTab === 'grocery' ? (
            filteredGroceries.length > 0 ? (
              <div className="product-grid">
                {filteredGroceries.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--gray-500)' }}>
                <p>No grocery items found matching "{searchQuery}"</p>
              </div>
            )
          ) : filteredRentals.length > 0 ? (
            <div className="rental-list">
              {filteredRentals.map((p) => (
                <RentalCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--gray-500)' }}>
              <p>No rental products found matching "{searchQuery}"</p>
            </div>
          )}
        </section>
      )}

      {/* REGULAR GROCERY VIEW */}
      {!isSearching && currentTab === 'grocery' && (
        <>
          {selectedCategory !== 'all' ? (
            <section className="product-section">
              <div className="section-head">
                <h3 className="section-title" style={{ textTransform: 'capitalize' }}>
                  {selectedCategory} Category
                </h3>
                <button className="see-all-link" onClick={() => setSelectedCategory('all')}>
                  Show All
                </button>
              </div>
              <div className="product-grid">
                {filteredGroceries.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* Bestsellers Section */}
              <section className="product-section">
                <div className="section-head">
                  <h3 className="section-title">⚡ 10-Minute Best Sellers</h3>
                  <button className="see-all-link" onClick={() => navigateTo('categories')}>
                    See All ›
                  </button>
                </div>
                <div className="product-grid">
                  {groceryProducts.slice(0, 6).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              {/* Fresh Produce & Dairy */}
              <section className="product-section">
                <div className="section-head">
                  <h3 className="section-title">🥛 Dairy, Bread & Eggs</h3>
                  <button className="see-all-link" onClick={() => setSelectedCategory('dairy')}>
                    View Dairy ›
                  </button>
                </div>
                <div className="product-grid">
                  {groceryProducts.filter((p) => p.category === 'dairy' || p.category === 'bakery').slice(0, 6).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              {/* Fruits & Veggies */}
              <section className="product-section">
                <div className="section-head">
                  <h3 className="section-title">🍎 Farm Fresh Fruits & Veggies</h3>
                  <button className="see-all-link" onClick={() => setSelectedCategory('fruits')}>
                    View All ›
                  </button>
                </div>
                <div className="product-grid">
                  {groceryProducts.filter((p) => p.category === 'fruits' || p.category === 'veggies').slice(0, 6).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>

              {/* Snacks & Drinks */}
              <section className="product-section">
                <div className="section-head">
                  <h3 className="section-title">🍿 Snacks & Cold Drinks</h3>
                  <button className="see-all-link" onClick={() => setSelectedCategory('snacks')}>
                    View Snacks ›
                  </button>
                </div>
                <div className="product-grid">
                  {groceryProducts.filter((p) => p.category === 'snacks' || p.category === 'drinks').slice(0, 6).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* REGULAR RENTAL VIEW */}
      {!isSearching && currentTab === 'rental' && (
        <section className="product-section">
          <div className="section-head">
            <h3 className="section-title">
              {selectedCategory !== 'all'
                ? `${selectedCategory.toUpperCase()} RENTALS`
                : '🛋️ Trending Furniture & Appliances'}
            </h3>
            {selectedCategory !== 'all' && (
              <button className="see-all-link" onClick={() => setSelectedCategory('all')}>
                Show All
              </button>
            )}
          </div>
          <div className="rental-list">
            {filteredRentals.map((p) => (
              <RentalCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
