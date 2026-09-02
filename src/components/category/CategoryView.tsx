import React, { useState, useMemo } from 'react';
import type { Product, Category } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface CategoryViewProps {
  category: Category;
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  products,
  onSelectProduct
}) => {
  const { addToQuote, items } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.categoryId === category.id);
  }, [products, category.id]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return categoryProducts;
    const term = searchTerm.toLowerCase();
    return categoryProducts.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }, [categoryProducts, searchTerm]);

  const isProductInQuote = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Category Header */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.76rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Corporate Collection • {categoryProducts.length} Items Available
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              {category.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '640px' }}>
              {category.description}
            </p>
          </div>

          <div className="search-input-box">
            <span className="search-icon-pos">🔍</span>
            <input
              type="text"
              placeholder={`Search ${category.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '10px',
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

        {/* GST Notification Note */}
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1.25rem', textAlign: 'right' }}>
          * All prices displayed in AUD (ex. GST). Standard 10% GST calculated on quotation.
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)'
          }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>No products matching "{searchTerm}"</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const inQuote = isProductInQuote(product.id);

              return (
                <div key={product.id} className="product-card">
                  <div className="product-img-wrap" onClick={() => onSelectProduct(product.id)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                      loading="lazy"
                    />
                    <span className="product-badge">{product.sku}</span>
                  </div>

                  <div className="product-body">
                    <span className="product-category-meta">{product.categoryName}</span>
                    <h3
                      className="product-title"
                      onClick={() => onSelectProduct(product.id)}
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="product-tagline">{product.description}</p>

                    <div className="product-pricing-box">
                      <div className="product-price-row">
                        <span className="tier-from-label">Regular Price</span>
                        <span className="price-unit">A${product.price}</span>
                      </div>
                    </div>

                    <div className="product-card-actions">
                      <button
                        className="btn-add-quote"
                        onClick={() => addToQuote(product, 1)}
                      >
                        {inQuote ? '✓ In Quote' : '+ Add to Quote'}
                      </button>
                      <button
                        className="btn-view-details"
                        onClick={() => onSelectProduct(product.id)}
                      >
                        Details
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
