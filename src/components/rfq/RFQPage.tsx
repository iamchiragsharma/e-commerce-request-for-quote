import React, { useState } from 'react';
import { useQuote } from '../../context/QuoteContext';
import type { ActivePage, CompanyDetails, SubmittedQuote } from '../../types';
import { QuoteConfirmation } from './QuoteConfirmation';

interface RFQPageProps {
  onNavigate: (page: ActivePage, categoryId?: string, productId?: string) => void;
}

export const RFQPage: React.FC<RFQPageProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearQuote,
    totalQuoteUnits,
    totalEstimatedValue,
    submitQuote,
    lastSubmittedQuote
  } = useQuote();

  const [activeSubmission, setActiveSubmission] = useState<SubmittedQuote | null>(null);

  const [formData, setFormData] = useState<CompanyDetails>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    deliveryDate: '',
    shippingCountry: 'United States',
    shippingCity: '',
    estimatedBudget: '$5,000 - $15,000',
    additionalNotes: '',
    hasLogoFile: false,
    logoFileName: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CompanyDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        handleInputChange('hasLogoFile', true);
        handleInputChange('logoFileName', file.name);
      }, 600);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) errors.contactName = 'Contact person name is required';
    if (!formData.email.trim()) {
      errors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid work email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required for quote verification';
    if (!formData.shippingCity.trim()) errors.shippingCity = 'Destination city is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) return;

    const result = submitQuote(formData);
    setActiveSubmission(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeSubmission) {
    return <QuoteConfirmation quote={activeSubmission} onNavigate={onNavigate} />;
  }

  return (
    <div className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>Home</span> &gt;
            <strong style={{ color: 'var(--text-primary)' }}>Request For Quote (RFQ) Basket</strong>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Request For Quote (RFQ) Review
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '700px' }}>
            Review your custom-branded gift curation, select quantities, and submit your enterprise specs for a formal 24-hour PDF pricing proposal.
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4.5rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Your Quote Basket is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '460px', margin: '0 auto 2rem' }}>
              Explore our curated executive gifts, sustainable onboarding bundles, or tech collections and add items to generate a tiered RFQ.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('categories')}
              >
                Browse Corporate Collections
              </button>
              {lastSubmittedQuote && (
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => setActiveSubmission(lastSubmittedQuote)}
                >
                  View Last RFQ ({lastSubmittedQuote.rfqId})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rfq-grid">
            {/* Left Column: Basket Items */}
            <div className="rfq-basket-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Selected Corporate Gifts ({items.length})
                </h3>
                <button
                  onClick={clearQuote}
                  style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear All Items
                </button>
              </div>

              {items.map((item) => {
                const packagingPrice = item.customPackaging ? 3.5 : 0;
                const unitTotal = item.estimatedUnitPrice + packagingPrice;
                const itemTotal = unitTotal * item.quantity;

                return (
                  <div key={item.product.id} className="basket-item-row">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="basket-item-thumb"
                      onClick={() => onNavigate('product', undefined, item.product.id)}
                      style={{ cursor: 'pointer' }}
                    />

                    <div>
                      <h4
                        className="basket-item-title"
                        onClick={() => onNavigate('product', undefined, item.product.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.product.name}
                      </h4>

                      <div style={{ marginBottom: '0.5rem' }}>
                        {item.customizations.map((c, i) => (
                          <span key={i} className="basket-item-badge">
                            🎨 {c.method}
                          </span>
                        ))}
                        {item.customPackaging && (
                          <span className="basket-item-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>
                            🎁 Custom Box Included
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="stepper-control" style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                          <button
                            className="stepper-btn"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 10)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="stepper-input"
                            value={item.quantity}
                            min={item.product.minOrderQty}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || item.product.minOrderQty)}
                          />
                          <button
                            className="stepper-btn"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 10)}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          MOQ: {item.product.minOrderQty} units
                        </span>
                      </div>

                      <button
                        className="btn-remove-item"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove from RFQ
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div className="basket-item-price">
                        ${itemTotal.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ${unitTotal.toFixed(2)} /unit
                      </div>
                    </div>
                  </div>
                );
              })}

              <div style={{
                marginTop: '2rem',
                background: 'var(--bg-page)',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Corporate Quantity:</span>
                  <strong>{totalQuoteUnits} Units</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Order Value:</span>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--color-brand-accent)' }}>
                    ${totalEstimatedValue.toLocaleString()}
                  </strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  * Final pricing reflects exact tiered volume discounts, freight options, and applicable local sales tax verified in your formal PDF proposal.
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('categories')}
                >
                  + Add More Gifts from Catalog
                </button>
              </div>
            </div>

            {/* Right Column: Corporate Submission Form */}
            <div className="rfq-form-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Corporate Quotation Request
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                No obligation. Receive your itemized PDF quote and 3D mockup within 24 business hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Acme Technologies Inc."
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                    {formErrors.companyName && (
                      <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.companyName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                    />
                    {formErrors.contactName && (
                      <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.contactName}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Corporate Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="sarah@acme.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {formErrors.email && (
                      <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Direct Phone *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    {formErrors.phone && (
                      <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Target Delivery / Event Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Destination City *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. New York / London"
                      value={formData.shippingCity}
                      onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                    />
                    {formErrors.shippingCity && (
                      <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formErrors.shippingCity}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Gifting Budget Range</label>
                  <select
                    className="form-select"
                    value={formData.estimatedBudget}
                    onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
                  >
                    <option value="Under $2,500">Under $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000 (Recommended)</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                    <option value="$50,000+">$50,000+ Enterprise</option>
                  </select>
                </div>

                {/* Logo Artwork Upload Mock */}
                <div className="form-group">
                  <label className="form-label">Corporate Logo Vector Artwork (Optional for 3D Proof)</label>
                  <label className="file-dropzone" htmlFor="logo-upload">
                    <input
                      id="logo-upload"
                      type="file"
                      accept=".ai,.eps,.pdf,.svg,.png"
                      style={{ display: 'none' }}
                      onChange={handleFileDrop}
                    />
                    <div className="file-dropzone-icon">📁</div>
                    {isUploading ? (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-brand-accent)', fontWeight: 600 }}>
                        Attaching artwork...
                      </div>
                    ) : formData.hasLogoFile ? (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-accent-emerald)', fontWeight: 700 }}>
                        ✓ Attached: {formData.logoFileName}
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          Click to upload vector logo (.AI, .EPS, .SVG, .PNG)
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Our design team will use this to prepare your complimentary 3D mockup
                        </div>
                      </>
                    )}
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Instructions or Custom Packaging Notes</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Mention custom Pantone colors, specific employee drop-shipping addresses, or packaging ribbons..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Submit Official RFQ Proposal Request
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  🔒 Secure submission • Zero financial commitment • Dedicated account manager
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
