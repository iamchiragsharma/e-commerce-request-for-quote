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

  const featuredSamples = products.slice(0, 8);

  return (
    <div>
      {/* Clean Hero Banner with Australian Touch */}
      <section className="hero-wrapper" style={{ padding: '3.5rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div className="hero-badge-pill" style={{ margin: '0 auto 1.25rem' }}>
            🇦🇺 Premium Corporate Gifting • Australia
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Elevate Your Business Relationships with Distinguished Corporate Gifts
          </h1>

          <p style={{ color: '#94A3B8', fontSize: '1.05rem', marginBottom: '1.75rem', lineHeight: 1.55 }}>
            Curated executive gifts and modern workplace tech essentials for Australian enterprises. Select your items, customize your quantities, and request a tailored quote.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('cat-executive')}
            >
              Explore Executive Gifts
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('cat-tech')}
            >
              Explore Employee Tech
            </button>
          </div>
        </div>
      </section>

      {/* Australian Trust Strip */}
      <div className="aus-trust-strip">
        <div className="container">
          <div className="aus-trust-grid">
            <div className="aus-trust-item">
              <div className="aus-trust-icon">🇦🇺</div>
              <div>
                <h4>Australian Owned & Operated</h4>
                <p>Sydney & Melbourne fulfillment hubs</p>
              </div>
            </div>

            <div className="aus-trust-item">
              <div className="aus-trust-icon">⚡</div>
              <div>
                <h4>Fast Australia-Wide Dispatch</h4>
                <p>Express courier to all capital cities</p>
              </div>
            </div>

            <div className="aus-trust-item">
              <div className="aus-trust-icon">✨</div>
              <div>
                <h4>Custom Corporate Branding</h4>
                <p>Precision laser engraving & embossing</p>
              </div>
            </div>

            <div className="aus-trust-item">
              <div className="aus-trust-icon">🌱</div>
              <div>
                <h4>Carbon Neutral Delivery</h4>
                <p>Eco-friendly packaging options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Category Quick Navigation Cards */}
      <section style={{ padding: '2.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1.5rem',
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
                <span style={{ fontSize: '0.75rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>Collection 1</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.4rem' }}>Executive Gifts</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Luxury leather accessories, Barossa wine crates, pens & hampers</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: '1rem', flexShrink: 0 }}>View →</button>
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1.5rem',
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
                <span style={{ fontSize: '0.75rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>Collection 2</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0 0.4rem' }}>Employee Tech</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ANC studio headphones, fast wireless chargers, USB hubs & accessories</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: '1rem', flexShrink: 0 }}>View →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Corporate Gifts Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Selected Range</span>
            <h2 className="section-title">Popular Corporate Gifts</h2>
            <p className="section-desc">
              Explore our most requested corporate packages. Select items to add them directly to your quote.
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

                    <div className="product-pricing-box" style={{ marginBottom: '0.85rem' }}>
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

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('cat-executive')}
            >
              Browse Complete Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
