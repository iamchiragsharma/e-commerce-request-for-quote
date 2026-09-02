import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import type { ActivePage } from '../../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, productId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { totalItems } = useQuote();

  return (
    <>
      {/* Australian Top Announcement Bar */}
      <div className="aus-announcement-bar">
        <span>🇦🇺 Proudly Australian Owned & Operated</span>
        <span>•</span>
        <span>Fast Dispatch Across Sydney, Melbourne, Brisbane & Australia-Wide</span>
        <span>•</span>
        <span>All Prices in AUD</span>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          {/* Left: Brand Logo with Australian Touch */}
          <div className="brand-logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
            <div className="brand-badge">A</div>
            <div>
              <span>Artisan</span>Corp <span style={{ color: '#059669', fontSize: '0.85em', fontWeight: 800 }}>AU</span>
            </div>
          </div>

          {/* Middle: Home | Category 1 | Category 2 */}
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

          {/* Right: Quote Icon & Quote Button */}
          <div className="header-actions">
            <button
              className="btn-rfq-basket"
              onClick={() => onNavigate('quote')}
              aria-label="View Quote"
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
          </div>
        </div>
      </header>
    </>
  );
};
