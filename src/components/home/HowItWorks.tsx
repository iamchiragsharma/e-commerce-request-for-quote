import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import type { ActivePage } from '../../types';

interface HowItWorksProps {
  onNavigate: (page: ActivePage) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <section id="how-it-works" className="section-padding how-it-works-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Enterprise Workflow</span>
          <h2 className="section-title">How Our Request For Quote (RFQ) Operates</h2>
          <p className="section-desc">
            Bespoke corporate gifting without the guesswork. No upfront payment required to obtain formal volume quotes.
          </p>
        </div>

        <div className="steps-grid">
          {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
            <div key={idx} className="step-card">
              <div className="step-num">{stepItem.step}</div>
              <h3>{stepItem.title}</h3>
              <p>{stepItem.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '16px',
          padding: '2.5rem 3rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Have an urgent corporate event or strict brand guidelines?
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '560px' }}>
              Our dedicated corporate account directors provide custom Pantone color matching, sustainable packaging audits, and multi-hub logistics.
            </p>
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('rfq')}
          >
            Start Your RFQ Now
          </button>
        </div>
      </div>
    </section>
  );
};
