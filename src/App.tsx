
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import BasinKulturSanat from './pages/BasinKulturSanat';
import KadininKalemi from './pages/KadininKalemi';
import ArticleDetail from './pages/ArticleDetail';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  // Allowed pages for routing
  const validPages: Page[] = [
    'home', 
    'biz-kimiz', 
    'basin', 
    'basin-bultenleri', 
    'etkinlikler', 
    'galeri', 
    'kalem', 
    'raporlar', 
    'iletisim', 
    'programs'
  ];

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // Check for article route with regex or simple split
      if (hash.startsWith('article/')) {
        const slug = hash.split('/')[1];
        if (slug) {
          setCurrentPage('article-detail' as Page); // Casting as Page since we added it conceptually
          setCurrentSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (validPages.includes(hash as Page)) {
        setCurrentPage(hash as Page);
        setCurrentSlug(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentPage('home');
        setCurrentSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    setCurrentSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage === ('article-detail' as Page) && currentSlug) {
      return <ArticleDetail slug={currentSlug} />;
    }

    switch (currentPage) {
      case 'home': return <Home setPage={navigate} />;
      case 'biz-kimiz': return <About />;
      case 'raporlar': return <Resources />;
      case 'iletisim': return <Contact />;
      case 'programs': return <Programs />;
      case 'kalem': return <KadininKalemi />;
      case 'basin-bultenleri':
      case 'etkinlikler':
      case 'galeri':
      case 'basin':
        return <BasinKulturSanat currentPage={currentPage} />;
      default: return <Home setPage={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-neutral-bg selection:bg-brand-purple-200 selection:text-brand-purple-900">
      <Navbar currentPage={currentPage} setPage={navigate} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={navigate} />
    </div>
  );
};

export default App;
