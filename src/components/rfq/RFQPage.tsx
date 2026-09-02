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
  const [quoteReference, setQuoteReference] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deliveryState, setDeliveryState] = useState('NSW');

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = 'AU-Q-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteReference(generatedRef);
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

  const gstAmount = Math.round(totalRegularPrice * 0.1);
  const totalWithGst = totalRegularPrice + gstAmount;

  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            🇦🇺 Australian Corporate Quotation
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.25rem 0 0.4rem' }}>
            Corporate Quote Request
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
            Review your selected corporate gifts. Verify the Regular Price, enter a Custom Target Price per unit if desired, and provide specific customization notes.
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '14px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            maxWidth: '560px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Quote is Currently Empty</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Select items from our Executive Gifts or Employee Tech ranges to prepare your corporate quote.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onNavigate('cat-executive')}
              >
                Executive Gifts
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onNavigate('cat-tech')}
              >
                Employee Tech
              </button>
            </div>
          </div>
        ) : (
          <div className="quote-page-grid">
            {/* Left Column: Quote Items List */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  Selected Items ({items.length})
                </h3>
                <button
                  onClick={clearQuote}
                  style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear All
                </button>
              </div>

              {items.map((item) => {
                const lineRegularTotal = item.product.price * item.quantity;
                const customNum = typeof item.customPrice === 'number' ? item.customPrice : parseFloat(item.customPrice || '0');
                const lineCustomTotal = customNum > 0 ? customNum * item.quantity : null;

                return (
                  <div key={item.product.id} className="quote-item-card">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '84px', height: '84px', borderRadius: '8px', objectFit: 'cover', cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => onNavigate('product', item.product.id)}
                    />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.35rem' }}>
                        <div>
                          <h4
                            style={{ fontSize: '0.98rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}
                            onClick={() => onNavigate('product', item.product.id)}
                          >
                            {item.product.name}
                          </h4>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            SKU: {item.product.sku} &nbsp;•&nbsp; {item.product.categoryName}
                          </span>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                          title="Remove item"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      {/* Quantity Stepper & Regular Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '0.6rem 0', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Qty:</span>
                          <div className="stepper-control">
                            <button className="stepper-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                            <input
                              type="number"
                              className="stepper-input"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            />
                            <button className="stepper-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                          </div>
                        </div>

                        <div style={{ fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Regular Price: </span>
                          <strong style={{ color: 'var(--text-primary)' }}>A${item.product.price} AUD</strong>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '0.35rem' }}>(A${lineRegularTotal.toLocaleString()} total)</span>
                        </div>
                      </div>

                      {/* Custom Price & Input Note */}
                      <div style={{ background: 'var(--bg-page)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '0.6rem' }}>
                        <div className="form-row">
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                              Custom Target Price (A$ / unit):
                            </label>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>A$</span>
                              <input
                                type="number"
                                className="form-input"
                                style={{ paddingLeft: '2rem' }}
                                placeholder="e.g. 50"
                                value={item.customPrice ?? ''}
                                onChange={(e) => updateCustomPrice(item.product.id, e.target.value)}
                              />
                            </div>
                            {lineCustomTotal && (
                              <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem', fontWeight: 600 }}>
                                Custom Total: A${lineCustomTotal.toLocaleString()} AUD
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                              Customization / Note:
                            </label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Engrave company emblem, deliver to Sydney"
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

              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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

            {/* Right Column: Australian Corporate Inquiry & Summary */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
                Quotation Summary
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Units:</span>
                <strong>{totalItems} items</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Regular Subtotal (ex GST):</span>
                <strong>A${totalRegularPrice.toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated 10% GST:</span>
                <span>A${gstAmount.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', margin: '0.75rem 0', fontSize: '0.98rem' }}>
                <span style={{ fontWeight: 700 }}>Total (inc GST):</span>
                <strong style={{ color: 'var(--color-brand-primary)' }}>A${totalWithGst.toLocaleString()} AUD</strong>
              </div>

              {hasAnyCustomPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.88rem', color: '#065F46', background: '#ECFDF5', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
                  <span style={{ fontWeight: 600 }}>Requested Custom Subtotal:</span>
                  <strong style={{ fontSize: '0.98rem' }}>A${totalCustomPrice.toLocaleString()} AUD</strong>
                </div>
              )}

              {/* Quick Contact Form */}
              <form onSubmit={handleRequestQuote} style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Atlassian / Canva / Telstra"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Person *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Liam Fletcher"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Work Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="liam@company.com.au"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Australian Delivery State</label>
                  <select
                    className="form-select"
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                  >
                    <option value="NSW">New South Wales (NSW)</option>
                    <option value="VIC">Victoria (VIC)</option>
                    <option value="QLD">Queensland (QLD)</option>
                    <option value="WA">Western Australia (WA)</option>
                    <option value="SA">South Australia (SA)</option>
                    <option value="TAS">Tasmania (TAS)</option>
                    <option value="ACT">Australian Capital Territory (ACT)</option>
                    <option value="NT">Northern Territory (NT)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  Submit Quote Request
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                🇦🇺 Australian B2B Procurement • Response within 1 business day
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {submittedModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.25rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 1rem',
                fontWeight: 800
              }}>
                ✓
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Quote Request Received!
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Thank you, <strong>{contactName || 'Valued Client'}</strong> ({companyName || 'Corporate Partner'}). Our Australian corporate gifting team has received your custom quote.
              </p>

              <div style={{
                background: 'var(--bg-page)',
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--color-brand-accent)',
                marginBottom: '1.25rem'
              }}>
                Reference: {quoteReference}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'left', background: 'var(--bg-surface-muted)', padding: '0.85rem', borderRadius: '6px' }}>
                <div>• <strong>Destination:</strong> {deliveryState}, Australia</div>
                <div>• <strong>Items:</strong> {totalItems} units ({items.length} product lines)</div>
                <div>• <strong>Regular Total:</strong> A${totalWithGst.toLocaleString()} AUD (inc GST)</div>
                {hasAnyCustomPrice && <div>• <strong>Requested Custom Subtotal:</strong> A${totalCustomPrice.toLocaleString()} AUD</div>}
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setSubmittedModal(false);
                  clearQuote();
                  onNavigate('home');
                }}
              >
                Back to Catalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
