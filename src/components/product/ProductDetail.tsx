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

  // Simple reviews state so users can add demo reviews if they want
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);
  const [newAuthor, setNewAuthor] = useState('');
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
      date: 'Just now'
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
        <div style={{ marginBottom: '2rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate(product.categoryId)}
          >
            ← Back to {product.categoryName}
          </button>
        </div>

        <div className="product-detail-layout" style={{ marginBottom: '4rem' }}>
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="gallery-main-img"
              style={{ maxHeight: '460px', objectFit: 'cover' }}
            />
          </div>

          {/* Product Info, SKU, Price, Qty, Add to Quote */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="detail-category-tag" style={{ margin: 0 }}>
                {product.categoryName}
              </span>
              <span style={{
                background: 'var(--bg-surface-muted)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)'
              }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Price */}
            <div style={{ margin: '1.25rem 0', padding: '1rem', background: 'var(--bg-page)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>REGULAR PRICE</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ${product.price}
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}> /unit</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Description:</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & Add to Quote */}
            <div className="qty-cta-panel">
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Select Quantity:</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total: <strong>${(product.price * quantity).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToQuote}
                  style={{ flex: 1 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  {addedSuccess ? `✓ Added ${quantity} to Quote!` : `Add to Quote`}
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => onNavigate('quote')}
                >
                  View Quote
                </button>
              </div>

              {addedSuccess && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-accent-emerald-light)',
                  color: 'var(--color-accent-emerald)',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>✓ {quantity}x {product.name} added to your quote.</span>
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => onNavigate('quote')}
                  >
                    Open Quote Page →
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                Customer Reviews
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#F59E0B', fontSize: '1.2rem' }}>★★★★★</span>
                <span style={{ fontWeight: 700 }}>{avgRating} out of 5</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({reviewsList.length} reviews)</span>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel Review' : '+ Write a Review'}
            </button>
          </div>

          {/* Simple Write Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleAddReview}
              style={{
                background: 'var(--bg-page)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2.5rem',
                maxWidth: '600px'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Share Your Experience</h4>
              <div className="form-group">
                <label className="form-label">Your Name or Organization</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Henderson"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                >
                  <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                  <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review Comment</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="How was the product quality and packaging?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
            </form>
          )}

          {/* Reviews List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                style={{
                  background: 'var(--bg-page)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F59E0B', fontSize: '1rem' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
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
