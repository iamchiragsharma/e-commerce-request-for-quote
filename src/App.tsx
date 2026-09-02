import React, { useState, useEffect } from 'react';
import { QuoteProvider } from './context/QuoteContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SimpleHome } from './components/home/SimpleHome';
import { CategoryView } from './components/category/CategoryView';
import { ProductDetail } from './components/product/ProductDetail';
import { RFQPage } from './components/rfq/RFQPage';
import { CATEGORIES, PRODUCTS } from './data/mockData';
import type { ActivePage, Product } from './types';
import './styles/main.css';

export const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-ex-1');

  // Sync with URL hash for browser back/forward and direct refresh
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const pId = hash.split('/')[1];
        if (pId) {
          setSelectedProductId(pId);
          setActivePage('product');
        }
      } else if (hash === 'executive-gifts' || hash === 'cat-executive') {
        setActivePage('cat-executive');
      } else if (hash === 'employee-tech' || hash === 'cat-tech') {
        setActivePage('cat-tech');
      } else if (hash === 'quote' || hash === 'rfq') {
        setActivePage('quote');
      } else {
        setActivePage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: ActivePage, productId?: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (productId) {
      setSelectedProductId(productId);
      window.location.hash = `product/${productId}`;
    } else if (page === 'cat-executive') {
      window.location.hash = 'executive-gifts';
    } else if (page === 'cat-tech') {
      window.location.hash = 'employee-tech';
    } else if (page === 'quote') {
      window.location.hash = 'quote';
    } else {
      window.location.hash = 'home';
    }
  };

  const selectedProduct: Product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const executiveCategory = CATEGORIES[0];
  const techCategory = CATEGORIES[1];

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <main style={{ flex: 1 }}>
        <div
          key={activePage === 'product' ? `product-${selectedProductId}` : activePage}
          className="page-transition-wrapper"
        >
          {activePage === 'home' && (
            <SimpleHome
              products={PRODUCTS}
              onNavigate={navigateTo}
              onSelectProduct={(prodId) => navigateTo('product', prodId)}
            />
          )}

          {activePage === 'cat-executive' && (
            <CategoryView
              category={executiveCategory}
              products={PRODUCTS}
              onSelectProduct={(prodId) => navigateTo('product', prodId)}
            />
          )}

          {activePage === 'cat-tech' && (
            <CategoryView
              category={techCategory}
              products={PRODUCTS}
              onSelectProduct={(prodId) => navigateTo('product', prodId)}
            />
          )}

          {activePage === 'product' && (
            <ProductDetail
              product={selectedProduct}
              onNavigate={navigateTo}
            />
          )}

          {activePage === 'quote' && (
            <RFQPage onNavigate={navigateTo} />
          )}
        </div>
      </main>

      <Footer onNavigate={(page) => navigateTo(page)} />
    </div>
  );
};

export default function App() {
  return (
    <QuoteProvider>
      <AppContent />
    </QuoteProvider>
  );
}
