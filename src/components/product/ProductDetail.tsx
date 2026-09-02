import React, { useState } from 'react';
import type { Product, ActivePage, ProductReview } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: ActivePage) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const { addToQuote } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Sydney, NSW');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleInc = () => setQuantity((q) => q + 1);
  const handleDec = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToQuote = () => {
    addToQuote(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ProductReview = {
      id: 'rev-' + Date.now(),
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: newLocation
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewAuthor('');
    setNewComment('');
    setShowReviewForm(false);
  };

  const avgRating = (
    reviewsList.reduce((acc, r) => acc + r.rating, 0) / (reviewsList.length || 1)
  ).toFixed(1);

  return (
    <div className="section-padding" style={{ background: 'white' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate(product.categoryId)}
          >
            ← Back to {product.categoryName}
          </button>
        </div>

        <div className="product-detail-layout" style={{ marginBottom: '3rem' }}>
          {/* Product Image & Australian Delivery Note */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="gallery-main-img"
              style={{ maxHeight: '420px', objectFit: 'cover' }}
            />

            <div style={{
              marginTop: '1rem',
              padding: '0.85rem 1rem',
              background: 'var(--bg-page)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                🇦🇺 Australian Fulfillment & Service:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <li>✓ Express dispatch to all Australian capital cities & regions</li>
                <li>✓ Free 2D/3D digital artwork proofs prior to invoice confirmation</li>
                <li>✓ Bulk quote discounts applied automatically on requested volumes</li>
              </ul>
            </div>
          </div>

          {/* Product Info, SKU, Price, Qty, Add to Quote */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="detail-category-tag">
                {product.categoryName}
              </span>
              <span style={{
                background: 'var(--bg-surface-muted)',
                color: 'var(--text-secondary)',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.12rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)'
              }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Regular Price */}
            <div style={{ margin: '0.85rem 0', padding: '0.75rem 1rem', background: 'var(--bg-page)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>REGULAR PRICE (EX GST)</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                A${product.price}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}> AUD /unit</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.86rem', fontWeight: 700, marginBottom: '0.35rem' }}>Description:</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & Add to Quote */}
            <div className="qty-cta-panel">
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Order Quantity:</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <div className="stepper-control">
                    <button className="stepper-btn" onClick={handleDec} aria-label="Decrease quantity">-</button>
                    <input
                      type="number"
                      className="stepper-input"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button className="stepper-btn" onClick={handleInc} aria-label="Increase quantity">+</button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Est. Total: <strong>A${(product.price * quantity).toLocaleString()} AUD</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-mobile-full"
                  onClick={handleAddToQuote}
                  style={{ flex: 1 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  {addedSuccess ? `✓ Added ${quantity} to Quote` : `Add to Quote`}
                </button>

                <button
                  className="btn btn-secondary btn-mobile-full"
                  onClick={() => onNavigate('quote')}
                >
                  View Quote
                </button>
              </div>

              {addedSuccess && (
                <div
                  className="toast-slide-in"
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.6rem 0.75rem',
                    background: 'var(--color-accent-emerald-light)',
                    color: 'var(--color-accent-emerald)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.35rem'
                  }}
                >
                  <span>✓ {quantity}x {product.name} added.</span>
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => onNavigate('quote')}
                  >
                    Open Quote →
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                Client Reviews
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#F59E0B', fontSize: '1rem' }}>★★★★★</span>
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{avgRating} out of 5</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({reviewsList.length} reviews)</span>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel' : '+ Write a Review'}
            </button>
          </div>

          {/* Simple Write Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleAddReview}
              style={{
                background: 'var(--bg-page)',
                padding: '1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.75rem',
                maxWidth: '560px'
              }}
            >
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem' }}>Add Corporate Feedback</h4>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Contact Name / Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sarah Jenkins"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <select
                    className="form-select"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  >
                    <option value="Sydney, NSW">Sydney, NSW</option>
                    <option value="Melbourne, VIC">Melbourne, VIC</option>
                    <option value="Brisbane, QLD">Brisbane, QLD</option>
                    <option value="Perth, WA">Perth, WA</option>
                    <option value="Adelaide, SA">Adelaide, SA</option>
                    <option value="Canberra, ACT">Canberra, ACT</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                >
                  <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Share feedback on product quality, branding, or delivery..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
            </form>
          )}

          {/* Reviews List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                style={{
                  background: 'var(--bg-page)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#F59E0B', fontSize: '0.85rem' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', fontStyle: 'italic', lineHeight: 1.45 }}>
                  "{rev.comment}"
                </p>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  {rev.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
