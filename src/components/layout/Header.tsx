import React, { useState, useEffect } from 'react';
import { useQuote } from '../../context/QuoteContext';
import type { ActivePage } from '../../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, productId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { totalItems } = useQuote();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileNav = (page: ActivePage) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      {/* Top Green Bar - Smooth Slow Infinite Marquee Scroll */}
      <div className="aus-announcement-bar" role="region" aria-label="Australian Business Notice">
        <div className="marquee-track">
          {/* First Content Track */}
          <div className="marquee-content">
            <span className="marquee-item">🇦🇺 Proudly Australian Owned & Operated</span>
            <span>•</span>
            <span className="marquee-item">Fast Dispatch Across Sydney, Melbourne, Brisbane & Australia-Wide</span>
            <span>•</span>
            <span className="marquee-item">All Prices in AUD (ex GST)</span>
            <span>•</span>
            <span className="marquee-item">Complimentary Digital 3D Proofs Included</span>
            <span>•</span>
            <span className="marquee-item">Toll-Free Australia: 1300 782 438</span>
            <span>•</span>
          </div>

          {/* Duplicate Content Track for Seamless Infinite Loop */}
          <div className="marquee-content" aria-hidden="true">
            <span className="marquee-item">🇦🇺 Proudly Australian Owned & Operated</span>
            <span>•</span>
            <span className="marquee-item">Fast Dispatch Across Sydney, Melbourne, Brisbane & Australia-Wide</span>
            <span>•</span>
            <span className="marquee-item">All Prices in AUD (ex GST)</span>
            <span>•</span>
            <span className="marquee-item">Complimentary Digital 3D Proofs Included</span>
            <span>•</span>
            <span className="marquee-item">Toll-Free Australia: 1300 782 438</span>
            <span>•</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          {/* Left on Mobile: Hamburger Button */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Brand Logo (Desktop: Left, Mobile: Middle) */}
          <div className="brand-logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
            <div className="brand-badge">A</div>
            <div>
              <span>Artisan</span>Corp <span style={{ color: '#059669', fontSize: '0.85em', fontWeight: 800 }}>AU</span>
            </div>
          </div>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <span
                  className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                  onClick={() => onNavigate('home')}
                  role="button"
                  tabIndex={0}
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  className={`nav-link ${activePage === 'cat-executive' ? 'active' : ''}`}
                  onClick={() => onNavigate('cat-executive')}
                  role="button"
                  tabIndex={0}
                >
                  Executive Gifts
                </span>
              </li>
              <li>
                <span
                  className={`nav-link ${activePage === 'cat-tech' ? 'active' : ''}`}
                  onClick={() => onNavigate('cat-tech')}
                  role="button"
                  tabIndex={0}
                >
                  Employee Tech
                </span>
              </li>
            </ul>
          </nav>

          {/* Right on Desktop: Quote Button with text */}
          <div className="header-actions">
            <button
              className="btn-rfq-basket"
              onClick={() => onNavigate('quote')}
              aria-label="View Quote Request"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Quote</span>
              {totalItems > 0 && (
                <span className="rfq-count-pill" title={`${totalItems} total items in quote`}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Right on Mobile: Simple Quote Icon Button */}
            <button
              className="btn-mobile-quote-icon"
              onClick={() => onNavigate('quote')}
              aria-label="View Quote"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {totalItems > 0 && (
                <span className="rfq-count-badge-mobile">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />

      {/* Mobile Drawer Menu (Slide-in from Left) */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-drawer-header">
          <div className="brand-logo" onClick={() => handleMobileNav('home')}>
            <div className="brand-badge">A</div>
            <span>ArtisanCorp AU</span>
          </div>
          <button
            className="mobile-drawer-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li
            className={`mobile-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleMobileNav('home')}
          >
            <span>Home</span>
            <span>→</span>
          </li>
          <li
            className={`mobile-nav-item ${activePage === 'cat-executive' ? 'active' : ''}`}
            onClick={() => handleMobileNav('cat-executive')}
          >
            <span>Executive Gifts (20 items)</span>
            <span>→</span>
          </li>
          <li
            className={`mobile-nav-item ${activePage === 'cat-tech' ? 'active' : ''}`}
            onClick={() => handleMobileNav('cat-tech')}
          >
            <span>Employee Tech (20 items)</span>
            <span>→</span>
          </li>
          <li
            className={`mobile-nav-item ${activePage === 'quote' ? 'active' : ''}`}
            onClick={() => handleMobileNav('quote')}
          >
            <span>Quote Basket ({totalItems})</span>
            <span>→</span>
          </li>
        </ul>

        <div className="mobile-drawer-footer">
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            🇦🇺 Australian Client Support
          </div>
          <div style={{ color: 'var(--color-brand-accent)', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.2rem' }}>
            1300 782 438
          </div>
          <div>All prices in AUD (ex GST)</div>
        </div>
      </div>
    </>
  );
};
