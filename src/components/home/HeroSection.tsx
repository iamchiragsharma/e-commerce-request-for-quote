import React from 'react';
import type { ActivePage, Product } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface HeroSectionProps {
  featuredProduct: Product;
  onNavigate: (page: ActivePage, categoryId?: string, productId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredProduct, onNavigate }) => {
  const { addToQuote } = useQuote();

  return (
    <section className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge-pill">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#34D399' }}></span>
              Enterprise Gifting & Bulk RFQ Platform
            </div>

            <h1 className="hero-title">
              Elevate Your Corporate Gifting with <span>Bespoke RFQ Pricing</span>
            </h1>

            <p className="hero-subtitle">
              Curate distinguished executive gifts, custom-branded onboarding kits, and sustainable tech essentials for your clients and team. Get instant tiered volume quotes in 24 hours.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('categories')}
              >
                Browse Corporate Catalog
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => onNavigate('rfq')}
              >
                Request Custom RFQ
              </button>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <h4>500+</h4>
                <p>Global Enterprises</p>
              </div>
              <div className="hero-stat-item">
                <h4>24h</h4>
                <p>RFQ Turnaround</p>
              </div>
              <div className="hero-stat-item">
                <h4>99.4%</h4>
                <p>On-Time Delivery</p>
              </div>
            </div>
          </div>

          <div className="hero-visual-card">
            <div className="hero-featured-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="hero-card-tag">Featured Executive Gift</span>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>MOQ: {featuredProduct.minOrderQty} units</span>
              </div>

              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="hero-img-preview"
                onClick={() => onNavigate('product', undefined, featuredProduct.id)}
                style={{ cursor: 'pointer' }}
              />

              <h3
                style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.4rem', cursor: 'pointer' }}
                onClick={() => onNavigate('product', undefined, featuredProduct.id)}
              >
                {featuredProduct.name}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                {featuredProduct.tagline}
              </p>

              <div className="hero-card-meta">
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Bulk Pricing From</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white' }}>
                    ${featuredProduct.tieredPricing[featuredProduct.tieredPricing.length - 1].unitPrice}
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 400 }}> /unit</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onNavigate('product', undefined, featuredProduct.id)}
                  >
                    View Specs
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToQuote(featuredProduct, featuredProduct.minOrderQty)}
                  >
                    + Add to Quote
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-floating-quote-badge">
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Complimentary 3D Mockup</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>With your corporate logo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
