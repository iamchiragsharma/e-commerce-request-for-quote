import React, { useState, useEffect } from 'react';
import { QuoteProvider } from './context/QuoteContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ValueProps } from './components/home/ValueProps';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedGifts } from './components/home/FeaturedGifts';
import { HowItWorks } from './components/home/HowItWorks';
import { Testimonials } from './components/home/Testimonials';
import { CategoryView } from './components/category/CategoryView';
import { ProductDetail } from './components/product/ProductDetail';
import { RFQPage } from './components/rfq/RFQPage';
import { CATEGORIES, PRODUCTS } from './data/mockData';
import type { ActivePage, Product } from './types';
import './styles/main.css';

export const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1');

  // Handle URL hash changes for easy browser navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const pId = hash.split('/')[1];
        if (pId) {
          setSelectedProductId(pId);
          setActivePage('product');
        }
      } else if (hash.startsWith('category/')) {
        const cId = hash.split('/')[1];
        setSelectedCategoryId(cId);
        setActivePage('categories');
      } else if (hash === 'categories') {
        setActivePage('categories');
      } else if (hash === 'rfq') {
        setActivePage('rfq');
      } else {
        setActivePage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: ActivePage, categoryId?: string, productId?: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (productId) {
      setSelectedProductId(productId);
      window.location.hash = `product/${productId}`;
    } else if (categoryId) {
      setSelectedCategoryId(categoryId);
      window.location.hash = `category/${categoryId}`;
    } else if (page === 'categories') {
      setSelectedCategoryId(undefined);
      window.location.hash = 'categories';
    } else if (page === 'rfq') {
      window.location.hash = 'rfq';
    } else {
      window.location.hash = 'home';
    }
  };

  const selectedProduct: Product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="site-wrapper">
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <main>
        {activePage === 'home' && (
          <>
            <HeroSection
              featuredProduct={PRODUCTS[0]}
              onNavigate={navigateTo}
            />
            <ValueProps />
            <CategoryGrid
              onSelectCategory={(catId) => navigateTo('categories', catId)}
              onNavigate={navigateTo}
            />
            <FeaturedGifts
              products={featuredProducts}
              onSelectProduct={(prodId) => navigateTo('product', undefined, prodId)}
            />
            <HowItWorks onNavigate={navigateTo} />
            <Testimonials />
          </>
        )}

        {activePage === 'categories' && (
          <CategoryView
            categories={CATEGORIES}
            products={PRODUCTS}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(catId) => setSelectedCategoryId(catId)}
            onSelectProduct={(prodId) => navigateTo('product', undefined, prodId)}
          />
        )}

        {activePage === 'product' && (
          <ProductDetail
            product={selectedProduct}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'rfq' && (
          <RFQPage onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
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
