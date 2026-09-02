import React from 'react';
import type { Product } from '../../types';
import { useQuote } from '../../context/QuoteContext';

interface FeaturedGiftsProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const FeaturedGifts: React.FC<FeaturedGiftsProps> = ({ products, onSelectProduct }) => {
  const { addToQuote, items } = useQuote();

  const isProductInBasket = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Most Requested Gifts</span>
          <h2 className="section-title">Bestselling Corporate Packages</h2>
          <p className="section-desc">
            Proven choices for executive holiday summits, annual conferences, partner appreciation, and employee milestones.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => {
            const lowestTier = product.tieredPricing[product.tieredPricing.length - 1];
            const inBasket = isProductInBasket(product.id);

            return (
              <div key={product.id} className="product-card">
                <div className="product-img-wrap" onClick={() => onSelectProduct(product.id)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>

                <div className="product-body">
                  <span className="product-category-meta">{product.category}</span>
                  <h3
                    className="product-title"
                    onClick={() => onSelectProduct(product.id)}
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="product-tagline">{product.tagline}</p>

                  <div className="product-pricing-box">
                    <div className="product-price-row">
                      <span className="tier-from-label">Volume Tier From</span>
                      <span className="price-unit">
                        ${lowestTier ? lowestTier.unitPrice : product.basePrice}
                        <span className="price-subtext"> /ea</span>
                      </span>
                    </div>
                    <div className="product-moq">
                      Min Order: <strong>{product.minOrderQty} units</strong> &nbsp;•&nbsp; Ships in {product.leadTimeDays}d
                    </div>
                  </div>

                  <div className="product-card-actions">
                    <button
                      className="btn-add-quote"
                      onClick={() => addToQuote(product, product.minOrderQty)}
                      title={`Add ${product.minOrderQty} units to quote basket`}
                    >
                      {inBasket ? '✓ Added (Add More)' : '+ Add to Quote'}
                    </button>
                    <button
                      className="btn-view-details"
                      onClick={() => onSelectProduct(product.id)}
                      title="View tiered volume pricing & customization options"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
