import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, QuoteItem } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (product: Product, quantity?: number, customPrice?: number | string, note?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateCustomPrice: (productId: string, customPrice: string | number) => void;
  updateNote: (productId: string, note: string) => void;
  removeItem: (productId: string) => void;
  clearQuote: () => void;
  totalItems: number;
  totalRegularPrice: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'corporate_quote_items_v2';

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save quote basket', err);
    }
  }, [items]);

  const addToQuote = (
    product: Product,
    quantity: number = 1,
    customPrice?: number | string,
    note?: string
  ) => {
    const qty = Math.max(quantity, 1);

    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + qty,
          customPrice: customPrice !== undefined ? customPrice : updated[existingIdx].customPrice,
          note: note !== undefined ? note : updated[existingIdx].note
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: qty,
          customPrice: customPrice ?? '',
          note: note ?? ''
        }
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.max(1, quantity)
          };
        }
        return item;
      })
    );
  };

  const updateCustomPrice = (productId: string, customPrice: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            customPrice
          };
        }
        return item;
      })
    );
  };

  const updateNote = (productId: string, note: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            note
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

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalRegularPrice = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        updateQuantity,
        updateCustomPrice,
        updateNote,
        removeItem,
        clearQuote,
        totalItems,
        totalRegularPrice
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
