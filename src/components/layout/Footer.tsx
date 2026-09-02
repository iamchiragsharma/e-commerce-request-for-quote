import React from 'react';
import type { ActivePage } from '../../types';

interface FooterProps {
  onNavigate: (page: ActivePage, categoryId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-badge">A</div>
              <h3 style={{ margin: 0 }}>ArtisanCorp</h3>
            </div>
            <p>
              Premium B2B corporate gifting solutions and rapid Request For Quote (RFQ) procurement. Delivering customized executive hampers, onboarding kits, and tech essentials to leading global enterprises.
            </p>
            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: '#64748B' }}>
              ✓ Sedex SMETA Audited &nbsp;•&nbsp; ✓ ISO 9001 Certified &nbsp;•&nbsp; ✓ EcoVadis Silver
            </div>
          </div>

          <div className="footer-col">
            <h4>Corporate Gifting</h4>
            <ul className="footer-links">
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); onNavigate('categories', 'cat-executive'); }}>Executive VIP Sets</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); onNavigate('categories', 'cat-tech'); }}>Premium Smart Tech</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); onNavigate('categories', 'cat-welcome'); }}>Employee Welcome Kits</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); onNavigate('categories', 'cat-eco'); }}>Eco & Sustainable Gifts</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); onNavigate('categories', 'cat-hampers'); }}>Gourmet Gift Crates</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>RFQ & Procurement</h4>
            <ul className="footer-links">
              <li><a href="#rfq" onClick={(e) => { e.preventDefault(); onNavigate('rfq'); }}>Review Quote Basket</a></li>
              <li><a href="#how" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>How Tiered Pricing Works</a></li>
              <li><a href="#proofs" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Free 3D Virtual Proofs</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Global Direct-to-Desk Drop Shipping</a></li>
              <li><a href="#samples" onClick={(e) => { e.preventDefault(); onNavigate('rfq'); }}>Request Pre-production Samples</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Enterprise Concierge</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Planning an event with 500+ recipients or require custom kitting? Speak directly with our senior corporate gifting specialists.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: 700 }}>DIRECT B2B HELPLINE</div>
              <div style={{ fontSize: '1.05rem', color: 'white', fontWeight: 700, margin: '0.2rem 0' }}>+1 (800) 582-7482</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>quotes@artisancorp-gifts.com</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} ArtisanCorp Corporate Gifting LLC. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Quotation</span>
            <span style={{ cursor: 'pointer' }}>Corporate Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
