import React from 'react';
import { TESTIMONIALS, CLIENT_LOGOS } from '../../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Enterprise Trust</span>
          <h2 className="section-title">Endorsed by Fast-Growing Teams</h2>
          <p className="section-desc">
            See how Fortune 500 companies and leading tech startups manage corporate gifting and onboarding with ArtisanCorp.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div style={{ color: '#F59E0B', fontSize: '1.25rem', marginBottom: '1rem' }}>
                ★★★★★
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div>
                <div className="testimonial-author-name">{t.author}</div>
                <div className="testimonial-author-role">
                  {t.role} • <span style={{ color: 'var(--color-brand-accent)', fontWeight: 600 }}>{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="client-logos-strip">
          <div className="logos-heading">Trusted by Procurement & People Teams At</div>
          <div className="logos-flex">
            {CLIENT_LOGOS.map((company, idx) => (
              <span key={idx} className="client-logo-item">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
