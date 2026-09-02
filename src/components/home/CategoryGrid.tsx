import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import type { ActivePage } from '../../types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, onNavigate }) => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Curated Collections</span>
          <h2 className="section-title">Explore Gifts by Corporate Department</h2>
          <p className="section-desc">
            From executive suites to new remote hires, select from certified sustainable and luxury corporate gifts built to impress.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => onSelectCategory(category.id)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-bg-img"
              />
              <div className="category-card-overlay"></div>
              <div className="category-card-content">
                <div className="category-count">{category.itemCount} Gift Sets Available</div>
                <h3 className="category-card-title">{category.name}</h3>
                <p className="category-card-desc">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => onNavigate('categories')}
          >
            View Complete Catalog (40+ Gifts)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
