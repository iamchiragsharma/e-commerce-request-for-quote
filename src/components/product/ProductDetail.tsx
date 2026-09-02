import React, { useState } from 'react';
import type { Product, CustomizationMethod, ActivePage } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: ActivePage, categoryId?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const { addToQuote, calculateUnitPrice, items } = useQuote();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrderQty);
  const [selectedMethod, setSelectedMethod] = useState<CustomizationMethod>(
    product.availableCustomizations[0] || 'Laser Engraving'
  );
  const [logoPlacement, setLogoPlacement] = useState('Front Center Primary');
  const [customPackaging, setCustomPackaging] = useState(false);
  const [brandingNotes, setBrandingNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentUnitPrice = calculateUnitPrice(product, quantity);
  const packagingCostPerUnit = customPackaging ? 3.5 : 0;
  const effectiveUnitPrice = currentUnitPrice + packagingCostPerUnit;
  const totalEstimatedCost = effectiveUnitPrice * quantity;

  // Calculate percentage savings compared to base price
  const baseTotal = product.basePrice * quantity;
  const savingsAmount = Math.max(0, baseTotal - (currentUnitPrice * quantity));
  const savingsPercent = Math.round((savingsAmount / baseTotal) * 100);

  const handleQuantityChange = (newVal: number) => {
    const valid = Math.max(product.minOrderQty, newVal);
    setQuantity(valid);
  };

  const handleAddToBasket = () => {
    addToQuote(
      product,
      quantity,
      [
        {
          method: selectedMethod,
          logoPlacement,
          notes: brandingNotes.trim() ? brandingNotes : undefined
        }
      ],
      customPackaging,
      brandingNotes.trim() ? brandingNotes : undefined
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 4000);
  };

  const basketItemCount = items.find((i) => i.product.id === product.id)?.quantity;

  return (
    <div className="section-padding" style={{ background: 'white' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>Home</span> &gt;
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('categories')}>Collections</span> &gt;
          <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('categories', product.categoryId)}>{product.category}</span> &gt;
          <strong style={{ color: 'var(--text-primary)' }}>{product.name}</strong>
        </div>

        <div className="product-detail-layout">
          {/* Left Column: Gallery */}
          <div>
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="gallery-main-img"
            />
            {product.images.length > 1 && (
              <div className="gallery-thumbs">
                {product.images.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className={`gallery-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  />
                ))}
              </div>
            )}

            {/* Value Guarantees for Corporate Buyers */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              background: 'var(--bg-page)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Corporate Procurement Guarantees
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>✓ <strong>Pre-Production Digital Proof:</strong> Rendered with your Pantone vector logo within 24 hours.</li>
                <li>✓ <strong>Tiered Bulk Pricing:</strong> Automatic volume discounts applied on RFQ submission.</li>
                <li>✓ <strong>Direct Global Kitting:</strong> Individual drop shipping available to remote employees or offices worldwide.</li>
                <li>✓ <strong>Complimentary Sample:</strong> Available upon approved RFQ for orders of 100+ units.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Product Specs, Customization & RFQ Builder */}
          <div>
            <div className="detail-category-tag">{product.category}</div>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>

            {/* Volume Tiered Pricing Matrix */}
            <div className="tiered-table-card">
              <div className="tiered-table-header">
                <span>Tiered Volume Pricing Schedule</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-accent)', fontWeight: 600 }}>
                  Live Tier Highlighted
                </span>
              </div>
              <div className="tiered-grid">
                {product.tieredPricing.map((tier, idx) => {
                  const isActive =
                    quantity >= tier.minQty &&
                    (tier.maxQty === undefined || quantity <= tier.maxQty);

                  return (
                    <div
                      key={idx}
                      className={`tier-box ${isActive ? 'active' : ''}`}
                      onClick={() => handleQuantityChange(tier.minQty)}
                      style={{ cursor: 'pointer' }}
                      title={`Click to set quantity to ${tier.minQty} units`}
                    >
                      <div className="tier-qty-label">
                        {tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `${tier.minQty}+`} units
                      </div>
                      <div className="tier-price-val">${tier.unitPrice}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customization Options */}
            <div className="customization-section">
              <label className="option-group-label">
                1. Select Custom Branding Method:
              </label>
              <div className="branding-methods-grid">
                {product.availableCustomizations.map((method) => (
                  <button
                    key={method}
                    className={`method-pill ${selectedMethod === method ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="form-row" style={{ marginTop: '1rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>
                    Logo Placement
                  </label>
                  <select
                    className="form-select"
                    value={logoPlacement}
                    onChange={(e) => setLogoPlacement(e.target.value)}
                  >
                    <option value="Front Center Primary">Front Center Primary</option>
                    <option value="Subdued Corner / Flank">Subdued Corner / Flank</option>
                    <option value="Pen Barrel / Metal Trim">Laser Barrel / Trim</option>
                    <option value="Custom Packaging Lid Only">Gift Box Lid Only</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>
                    Turnaround & Lead Time
                  </label>
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    ⚡ {product.leadTimeDays} Business Days
                  </div>
                </div>
              </div>

              {/* Packaging Add-on */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                  />
                  <span>
                    <strong>Add Bespoke Magnetic Gift Box & Custom Foil Ribbon</strong> (+ $3.50/unit)
                  </span>
                </label>
              </div>

              {/* Branding Instructions / Notes */}
              <div style={{ marginTop: '1rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Branding Notes or Pantone PMS Code (Optional):
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. PMS 286 C navy logo, white box sleeve"
                  value={brandingNotes}
                  onChange={(e) => setBrandingNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Quantity Stepper & Add to RFQ Action Panel */}
            <div className="qty-cta-panel">
              <div className="qty-stepper-row">
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Order Quantity (MOQ: {product.minOrderQty})
                  </div>
                  <div className="stepper-control">
                    <button
                      className="stepper-btn"
                      onClick={() => handleQuantityChange(quantity - 10)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="stepper-input"
                      value={quantity}
                      min={product.minOrderQty}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.minOrderQty)}
                    />
                    <button
                      className="stepper-btn"
                      onClick={() => handleQuantityChange(quantity + 10)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="live-estimate-text">
                  <div>
                    Unit Quote: <strong>${effectiveUnitPrice.toFixed(2)}</strong> /unit
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Total Estimated: <strong>${totalEstimatedCost.toLocaleString()}</strong> ({quantity} units)
                  </div>
                  {savingsAmount > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-emerald)', fontWeight: 700 }}>
                      ⚡ Volume discount saves ~${savingsAmount.toLocaleString()} ({savingsPercent}%)
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToBasket}
                  style={{ flex: 1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  {addedSuccess ? '✓ Added to RFQ Basket!' : `Add ${quantity} Units to Quote Basket`}
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => onNavigate('rfq')}
                >
                  Go to Quote Basket
                </button>
              </div>

              {addedSuccess && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'var(--color-accent-emerald-light)',
                  color: 'var(--color-accent-emerald)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>✓</span>
                  Successfully added {quantity} units to your RFQ basket.
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 'auto' }}
                    onClick={() => onNavigate('rfq')}
                  >
                    View & Submit RFQ →
                  </span>
                </div>
              )}

              {basketItemCount && !addedSuccess && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Note: You currently have {basketItemCount} units of this item in your Quote Basket.
                </div>
              )}
            </div>

            {/* Technical Specifications */}
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Item Specifications & Details
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {product.description}
              </p>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Key Features:</h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                {product.features.map((f, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{f}</li>
                ))}
              </ul>

              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
