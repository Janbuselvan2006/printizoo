import React from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, currentTab } = useApp();

  const placeholderText =
    currentTab === 'grocery'
      ? 'Search milk, bread, bananas, veggies...'
      : 'Search sofas, beds, fridge, washing machines...';

  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder={placeholderText}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search catalog"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
