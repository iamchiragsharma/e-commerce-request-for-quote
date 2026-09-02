import React, { useState } from 'react';
import { useQuote } from '../../context/QuoteContext';
import type { ActivePage } from '../../types';

interface RFQPageProps {
  onNavigate: (page: ActivePage, productId?: string) => void;
}

export const RFQPage: React.FC<RFQPageProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    updateCustomPrice,
    updateNote,
    removeItem,
    clearQuote,
    totalItems,
    totalRegularPrice
  } = useQuote();

  const [submittedModal, setSubmittedModal] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');

  const handleRequestQuote = () => {
    const generatedId = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
    setRfqNumber(generatedId);
    setSubmittedModal(true);
  };

  // Calculate total custom price if entered
  const totalCustomPrice = items.reduce((acc, item) => {
    const cPrice = typeof item.customPrice === 'number' ? item.customPrice : parseFloat(item.customPrice || '0');
    return acc + (cPrice > 0 ? cPrice * item.quantity : item.product.price * item.quantity);
  }, 0);

  const hasAnyCustomPrice = items.some(
    (item) => (typeof item.customPrice === 'number' ? item.customPrice : parseFloat(item.customPrice || '0')) > 0
  );

  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
            Quote Overview
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0.25rem 0 0.5rem' }}>
            Request For Quote
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '650px' }}>
            Review your selected corporate gifts below. You can view the Regular Price, enter a Custom Target Price, and add item notes for customization.
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Quote is Currently Empty</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Add items from our Executive Gifts or Employee Tech collections to create a quote.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('cat-executive')}
              >
                Executive Gifts (20 Items)
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onNavigate('cat-tech')}
              >
                Employee Tech (20 Items)
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '2.5rem', alignItems: 'flex-start' }}>
            {/* Left: Quote Items List */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Quote Items ({items.length})
                </h3>
                <button
                  onClick={clearQuote}
                  style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear Quote
                </button>
              </div>

              {items.map((item) => {
                const lineRegularTotal = item.product.price * item.quantity;
                const customNum = typeof item.customPrice === 'number' ? item.customPrice : parseFloat(item.customPrice || '0');
                const lineCustomTotal = customNum > 0 ? customNum * item.quantity : null;

                return (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr',
                      gap: '1.25rem',
                      padding: '1.5rem 0',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover', cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => onNavigate('product', item.product.id)}
                    />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                        <div>
                          <h4
                            style={{ fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}
                            onClick={() => onNavigate('product', item.product.id)}
                          >
                            {item.product.name}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            SKU: {item.product.sku} &nbsp;•&nbsp; Category: {item.product.categoryName}
                          </span>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                          title="Remove item"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      {/* Quantity Stepper & Regular Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '0.75rem 0', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Qty:</span>
                          <div className="stepper-control" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                            <button className="stepper-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                            <input
                              type="number"
                              className="stepper-input"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            />
                            <button className="stepper-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>

                        <div style={{ fontSize: '0.88rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Regular Price: </span>
                          <strong style={{ color: 'var(--text-primary)' }}>${item.product.price} /unit</strong>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }}>(${lineRegularTotal.toLocaleString()} total)</span>
                        </div>
                      </div>

                      {/* Custom Price & Input Note as explicitly requested */}
                      <div style={{ background: 'var(--bg-page)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '0.75rem' }}>
                        <div className="form-row" style={{ marginBottom: '0.5rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                              Custom Target Price (per unit):
                            </label>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>$</span>
                              <input
                                type="number"
                                className="form-input"
                                style={{ paddingLeft: '1.75rem', fontSize: '0.88rem' }}
                                placeholder="e.g. 50"
                                value={item.customPrice ?? ''}
                                onChange={(e) => updateCustomPrice(item.product.id, e.target.value)}
                              />
                            </div>
                            {lineCustomTotal && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-emerald)', marginTop: '0.25rem', fontWeight: 600 }}>
                                Custom Total: ${lineCustomTotal.toLocaleString()}
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                              Input Note / Customization:
                            </label>
                            <input
                              type="text"
                              className="form-input"
                              style={{ fontSize: '0.88rem' }}
                              placeholder="e.g. Engrave company logo on front"
                              value={item.note ?? ''}
                              onChange={(e) => updateNote(item.product.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('cat-executive')}
                >
                  + Add Executive Gifts
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('cat-tech')}
                >
                  + Add Employee Tech
                </button>
              </div>
            </div>

            {/* Right: Summary & Request Quote Button */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                Quote Summary
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Items Selected:</span>
                <strong>{totalItems} units</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Regular Price:</span>
                <strong style={{ fontSize: '1.1rem' }}>${totalRegularPrice.toLocaleString()}</strong>
              </div>

              {hasAnyCustomPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem', color: 'var(--color-brand-accent)', background: 'var(--color-brand-accent-light)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                  <span style={{ fontWeight: 600 }}>Requested Custom Total:</span>
                  <strong style={{ fontSize: '1.1rem' }}>${totalCustomPrice.toLocaleString()}</strong>
                </div>
              )}

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '1.25rem 0', lineHeight: 1.5, background: 'var(--bg-page)', padding: '0.75rem', borderRadius: '8px' }}>
                ℹ️ <strong>Client Demo Mode:</strong> Clicking "Request Quote" generates a live quote reference number. Email dispatch will be connected in the next phase.
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={handleRequestQuote}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Request Quote
              </button>
            </div>
          </div>
        )}

        {/* Demo Confirmation Modal / Dialog */}
        {submittedModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-accent-emerald-light)',
                color: 'var(--color-accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem',
                fontWeight: 800
              }}>
                ✓
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Quote Request Submitted!
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                Your custom quote with Regular & Requested Custom prices has been recorded for client review.
              </p>

              <div style={{
                background: 'var(--bg-page)',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--color-brand-accent)',
                marginBottom: '1.5rem'
              }}>
                Reference: {rfqNumber}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem', textAlign: 'left', background: 'var(--bg-surface-muted)', padding: '1rem', borderRadius: '8px' }}>
                <div>• <strong>Items:</strong> {totalItems} units across {items.length} product(s)</div>
                <div>• <strong>Regular Total:</strong> ${totalRegularPrice.toLocaleString()}</div>
                {hasAnyCustomPrice && <div>• <strong>Custom Target Total:</strong> ${totalCustomPrice.toLocaleString()}</div>}
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={() => {
                  setSubmittedModal(false);
                  clearQuote();
                  onNavigate('home');
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
