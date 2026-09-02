import React from 'react';
import type { Product, ActivePage } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface SimpleHomeProps {
  products: Product[];
  onNavigate: (page: ActivePage, productId?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const SimpleHome: React.FC<SimpleHomeProps> = ({ products, onNavigate, onSelectProduct }) => {
  const { addToQuote, items } = useQuote();

  const isProductInQuote = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  // Featured sample products for homepage
  const featuredSamples = products.slice(0, 8);

  return (
    <div>
      {/* Simple Clean Hero Banner */}
      <section className="hero-wrapper" style={{ padding: '4rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="hero-badge-pill" style={{ margin: '0 auto 1.25rem' }}>
            Corporate Gifting & Request For Quote
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Premium Corporate Gifts for Your Business
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Browse our curated collections of executive gifts and modern employee tech. Select items, configure quantities, and submit your custom quote request.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('cat-executive')}
            >
              Executive Gifts (20 Items)
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('cat-tech')}
            >
              Employee Tech (20 Items)
            </button>
          </div>
        </div>
      </section>

      {/* Two Category Shortcut Banners */}
      <section style={{ padding: '3rem 0 1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => onNavigate('cat-executive')}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>Category 1</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.25rem 0 0.5rem' }}>Executive Gifts</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>20 Luxury leather valets, pens, crystal sets & hampers</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>Browse 20 Items →</button>
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => onNavigate('cat-tech')}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>Category 2</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.25rem 0 0.5rem' }}>Employee Tech</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>20 ANC headphones, wireless chargers, hubs & desk essentials</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>Browse 20 Items →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Cards of Corporate Gift Products */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demo Showcase</span>
            <h2 className="section-title">Featured Corporate Gifts</h2>
            <p className="section-desc">
              Explore sample gifts below or browse by category. Click any product to view details or add directly to your quote.
            </p>
          </div>

          <div className="products-grid">
            {featuredSamples.map((product) => {
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

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('cat-executive')}
            >
              View All 40 Corporate Gifts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
