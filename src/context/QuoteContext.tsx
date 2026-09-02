import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, QuoteItem, SelectedCustomization, CompanyDetails, SubmittedQuote } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (
    product: Product,
    quantity?: number,
    customizations?: SelectedCustomization[],
    customPackaging?: boolean,
    notes?: string
  ) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearQuote: () => void;
  submitQuote: (company: CompanyDetails) => SubmittedQuote;
  lastSubmittedQuote: SubmittedQuote | null;
  totalQuoteUnits: number;
  totalEstimatedValue: number;
  calculateUnitPrice: (product: Product, quantity: number) => number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'corporate_rfq_basket_v1';
const SUBMISSION_KEY = 'corporate_rfq_last_submission_v1';

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastSubmittedQuote, setLastSubmittedQuote] = useState<SubmittedQuote | null>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save RFQ basket to storage', err);
    }
  }, [items]);

  const calculateUnitPrice = (product: Product, quantity: number): number => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) {
      return product.basePrice;
    }
    // Find matching tier
    for (let i = product.tieredPricing.length - 1; i >= 0; i--) {
      const tier = product.tieredPricing[i];
      if (quantity >= tier.minQty) {
        return tier.unitPrice;
      }
    }
    return product.basePrice;
  };

  const addToQuote = (
    product: Product,
    quantity: number = product.minOrderQty,
    customizations: SelectedCustomization[] = [{ method: product.availableCustomizations[0] || 'Laser Engraving' }],
    customPackaging: boolean = false,
    notes?: string
  ) => {
    const qty = Math.max(quantity, product.minOrderQty);
    const unitPrice = calculateUnitPrice(product, qty);

    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + qty;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          estimatedUnitPrice: calculateUnitPrice(product, newQty),
          customizations: customizations.length > 0 ? customizations : updated[existingIdx].customizations,
          customPackaging: customPackaging || updated[existingIdx].customPackaging,
          notes: notes || updated[existingIdx].notes
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: qty,
          customizations,
          customPackaging,
          notes,
          estimatedUnitPrice: unitPrice
        }
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.max(quantity, 1);
          return {
            ...item,
            quantity: validQty,
            estimatedUnitPrice: calculateUnitPrice(item.product, validQty)
          };
        }
        return item;
      })
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalQuoteUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalEstimatedValue = items.reduce((acc, item) => {
    const packagingAddon = item.customPackaging ? 3.5 : 0;
    return acc + (item.estimatedUnitPrice + packagingAddon) * item.quantity;
  }, 0);

  const submitQuote = (company: CompanyDetails): SubmittedQuote => {
    const rfqNumber = 'RFQ-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
    const sub: SubmittedQuote = {
      rfqId: rfqNumber,
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      company,
      items: [...items],
      estimatedTotalUnits: totalQuoteUnits,
      estimatedTotalRange: {
        min: Math.round(totalEstimatedValue * 0.95),
        max: Math.round(totalEstimatedValue * 1.05)
      },
      status: 'Pending Review'
    };

    setLastSubmittedQuote(sub);
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(sub));
    clearQuote();
    return sub;
  };

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        updateQuantity,
        removeItem,
        clearQuote,
        submitQuote,
        lastSubmittedQuote,
        totalQuoteUnits,
        totalEstimatedValue,
        calculateUnitPrice
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
