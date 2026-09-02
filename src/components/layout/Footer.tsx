import React from 'react';
import type { ActivePage } from '../../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}>
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div className="brand-badge">A</div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>ArtisanCorp Australia</h3>
            </div>
            <p style={{ marginBottom: '0.85rem' }}>
              Australia's premier corporate gifting service. Curated executive gift sets and workplace technology essentials customized for leading enterprises nationwide.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
              ABN: 48 619 824 105 &nbsp;•&nbsp; Level 14, 100 Miller St, North Sydney NSW 2060
            </div>
          </div>

          <div className="footer-col">
            <h4>Gift Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="#executive-gifts" onClick={(e) => { e.preventDefault(); onNavigate('cat-executive'); }}>
                  Executive Gifts (20 Items)
                </a>
              </li>
              <li>
                <a href="#employee-tech" onClick={(e) => { e.preventDefault(); onNavigate('cat-tech'); }}>
                  Employee Tech (20 Items)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#quote" onClick={(e) => { e.preventDefault(); onNavigate('quote'); }}>
                  Quote Basket
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Australian Inquiries</h4>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.72rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase' }}>TOLL-FREE AUSTRALIA</div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: 800, margin: '0.2rem 0' }}>1300 782 438</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>quotes@artisancorp.com.au</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} ArtisanCorp Corporate Gifting Australia Pty Ltd. All rights reserved.</div>
          <div style={{ color: '#64748B' }}>
            🇦🇺 Sydney &nbsp;•&nbsp; Melbourne &nbsp;•&nbsp; Brisbane &nbsp;•&nbsp; Perth &nbsp;•&nbsp; Adelaide
          </div>
        </div>
      </div>
    </footer>
  );
};
