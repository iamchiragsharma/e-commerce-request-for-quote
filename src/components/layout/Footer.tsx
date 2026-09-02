import React from 'react';
import type { ActivePage } from '../../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-badge">A</div>
              <h3 style={{ margin: 0 }}>ArtisanCorp</h3>
            </div>
            <p>
              Corporate Gifting & Request For Quote (RFQ) frontend demo for client presentation.
            </p>
          </div>

          <div className="footer-col">
            <h4>Gift Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="#executive-gifts" onClick={(e) => { e.preventDefault(); onNavigate('cat-executive'); }}>
                  Executive Gifts (20 items)
                </a>
              </li>
              <li>
                <a href="#employee-tech" onClick={(e) => { e.preventDefault(); onNavigate('cat-tech'); }}>
                  Employee Tech (20 items)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                  Homepage
                </a>
              </li>
              <li>
                <a href="#quote" onClick={(e) => { e.preventDefault(); onNavigate('quote'); }}>
                  View Quote Basket
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} ArtisanCorp Corporate Gifts Demo. All rights reserved.</div>
          <div style={{ color: '#64748B' }}>
            Frontend Client Demo Ready
          </div>
        </div>
      </div>
    </footer>
  );
};
