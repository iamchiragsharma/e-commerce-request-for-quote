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
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Corporate Category • {categoryProducts.length} Products
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {category.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '650px' }}>
              {category.description}
            </p>
          </div>

          <div className="search-input-box" style={{ minWidth: '280px' }}>
            <span className="search-icon-pos">🔍</span>
            <input
              type="text"
              placeholder={`Search ${category.name} by name or SKU...`}
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

        {/* Products Grid (20 items) */}
        {filteredProducts.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No products matching "{searchTerm}"</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>
              Clear Search
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

                    <div className="product-pricing-box" style={{ marginBottom: '1rem' }}>
                      <div className="product-price-row">
                        <span className="tier-from-label">Regular Price</span>
                        <span className="price-unit">${product.price}</span>
                      </div>
                    </div>

                    <div className="product-card-actions">
                      <button
                        className="btn-add-quote"
                        onClick={() => addToQuote(product, 1)}
                      >
                        {inQuote ? '✓ In Quote (+1)' : '+ Add to Quote'}
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
