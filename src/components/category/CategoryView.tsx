import React, { useState, useMemo } from 'react';
import type { Product, Category } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface CategoryViewProps {
  categories: Category[];
  products: Product[];
  selectedCategoryId?: string;
  onSelectCategory: (categoryId?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categories,
  products,
  selectedCategoryId,
  onSelectCategory,
  onSelectProduct,
}) => {
  const { addToQuote, items } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'moq'>('featured');
  const [ecoOnly, setEcoOnly] = useState(false);
  const [fastTurnaroundOnly, setFastTurnaroundOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategoryId && selectedCategoryId !== 'all' && product.categoryId !== selectedCategoryId) {
        return false;
      }
      // Eco filter
      if (ecoOnly && !product.isEcoFriendly) {
        return false;
      }
      // Fast turnaround (<= 7 days)
      if (fastTurnaroundOnly && product.leadTimeDays > 7) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesTag = product.tagline.toLowerCase().includes(term);
        const matchesCategory = product.category.toLowerCase().includes(term);
        const matchesCustomization = product.availableCustomizations.some((c) =>
          c.toLowerCase().includes(term)
        );
        if (!matchesName && !matchesTag && !matchesCategory && !matchesCustomization) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.basePrice - b.basePrice;
      }
      if (sortBy === 'price-desc') {
        return b.basePrice - a.basePrice;
      }
      if (sortBy === 'moq') {
        return a.minOrderQty - b.minOrderQty;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategoryId, searchTerm, sortBy, ecoOnly, fastTurnaroundOnly]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategoryId);

  const isProductInBasket = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span>Home</span> &gt; <span>Corporate Collections</span> {activeCategoryObj && <> &gt; <strong style={{ color: 'var(--text-primary)' }}>{activeCategoryObj.name}</strong></>}
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {activeCategoryObj ? activeCategoryObj.name : 'Corporate Gift Collections'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'Explore bespoke corporate packages, customized executive awards, employee welcome bundles, and sustainable gifts with volume pricing.'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="category-filter-bar">
          <div className="category-tabs">
            <button
              className={`category-tab-btn ${!selectedCategoryId || selectedCategoryId === 'all' ? 'active' : ''}`}
              onClick={() => onSelectCategory('all')}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="search-input-box">
            <span className="search-icon-pos">🔍</span>
            <input
              type="text"
              placeholder="Search gifts, tech, eco..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter & Sort Options */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '0.5rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={ecoOnly}
                onChange={(e) => setEcoOnly(e.target.checked)}
              />
              🌱 Eco & Sustainable Only
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={fastTurnaroundOnly}
                onChange={(e) => setFastTurnaroundOnly(e.target.checked)}
              />
              ⚡ Fast Turnaround (≤ 7 Days)
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                background: 'white',
                fontWeight: 600
              }}
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="moq">Lowest MOQ</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No matching corporate gifts found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Try adjusting your search query, clearing filters, or browsing other categories.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchTerm('');
                onSelectCategory('all');
                setEcoOnly(false);
                setFastTurnaroundOnly(false);
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const lowestTier = product.tieredPricing[product.tieredPricing.length - 1];
              const inBasket = isProductInBasket(product.id);

              return (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap" onClick={() => onSelectProduct(product.id)}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-img"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                  </div>

                  <div className="product-body">
                    <span className="product-category-meta">{product.category}</span>
                    <h3
                      className="product-title"
                      onClick={() => onSelectProduct(product.id)}
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="product-tagline">{product.tagline}</p>

                    <div className="product-pricing-box">
                      <div className="product-price-row">
                        <span className="tier-from-label">Volume Tier From</span>
                        <span className="price-unit">
                          ${lowestTier ? lowestTier.unitPrice : product.basePrice}
                          <span className="price-subtext"> /ea</span>
                        </span>
                      </div>
                      <div className="product-moq">
                        Min Order: <strong>{product.minOrderQty} units</strong> &nbsp;•&nbsp; Ships in {product.leadTimeDays}d
                      </div>
                    </div>

                    <div className="product-card-actions">
                      <button
                        className="btn-add-quote"
                        onClick={() => addToQuote(product, product.minOrderQty)}
                        title={`Add ${product.minOrderQty} units to quote basket`}
                      >
                        {inBasket ? '✓ Added (Add More)' : '+ Add to Quote'}
                      </button>
                      <button
                        className="btn-view-details"
                        onClick={() => onSelectProduct(product.id)}
                        title="View specifications & tier breakdown"
                      >
                        Specs
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
