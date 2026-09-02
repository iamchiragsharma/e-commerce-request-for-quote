import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import type { ActivePage } from '../../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, categoryId?: string, productId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { totalQuoteUnits, items } = useQuote();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
          <div className="brand-badge">A</div>
          <div>
            <span>Artisan</span>Corp <span style={{ color: 'var(--color-brand-accent)', fontSize: '0.8em' }}>B2B</span>
          </div>
        </div>

        <nav>
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
                className={`nav-link ${activePage === 'categories' ? 'active' : ''}`}
                onClick={() => onNavigate('categories')}
                role="button"
                tabIndex={0}
              >
                Collections & Gifts
              </span>
            </li>
            <li>
              <span
                className="nav-link"
                onClick={() => {
                  if (activePage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                role="button"
                tabIndex={0}
              >
                How RFQ Works
              </span>
            </li>
            <li>
              <span
                className={`nav-link ${activePage === 'rfq' ? 'active' : ''}`}
                onClick={() => onNavigate('rfq')}
                role="button"
                tabIndex={0}
              >
                Quote Basket
              </span>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="btn-rfq-basket"
            onClick={() => onNavigate('rfq')}
            aria-label="View Quote Request Basket"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Quote Basket</span>
            {items.length > 0 && (
              <span className="rfq-count-pill" title={`${totalQuoteUnits} total units in RFQ`}>
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
