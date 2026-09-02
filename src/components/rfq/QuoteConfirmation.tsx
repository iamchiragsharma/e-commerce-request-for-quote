import React from 'react';
import type { SubmittedQuote, ActivePage } from '../../types';

interface QuoteConfirmationProps {
  quote: SubmittedQuote;
  onNavigate: (page: ActivePage) => void;
}

export const QuoteConfirmation: React.FC<QuoteConfirmationProps> = ({ quote, onNavigate }) => {
  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        <div className="confirmation-container">
          <div className="success-icon-badge">✓</div>

          <span className="section-label">RFQ Submission Confirmed</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Thank You, {quote.company.contactName}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Your Request For Quote has been logged with our Enterprise Procurement team. We are preparing your formal PDF pricing proposal and complimentary 3D visual proof.
          </p>

          <div className="rfq-ref-number">
            Reference ID: <span>{quote.rfqId}</span>
          </div>

          <div style={{
            background: 'var(--bg-page)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Summary of Request
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Company:</span> <strong>{quote.company.companyName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Contact Email:</span> <strong>{quote.company.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Target Delivery:</span> <strong>{quote.company.deliveryDate || 'Flexible / Q3'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Destination:</span> <strong>{quote.company.shippingCity}, {quote.company.shippingCountry}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Total Units:</span> <strong>{quote.estimatedTotalUnits} items</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Range:</span> <strong>${quote.estimatedTotalRange.min.toLocaleString()} - ${quote.estimatedTotalRange.max.toLocaleString()}</strong>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Requested Items ({quote.items.length}):</div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                {quote.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>
                    <strong>{item.quantity}x</strong> {item.product.name} — {item.customizations.map(c => c.method).join(', ')}
                    {item.customPackaging ? ' (With Custom Box)' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              🖨️ Print / Save RFQ Receipt
            </button>

            <button
              className="btn btn-primary"
              onClick={() => onNavigate('categories')}
            >
              Browse More Corporate Gifts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
