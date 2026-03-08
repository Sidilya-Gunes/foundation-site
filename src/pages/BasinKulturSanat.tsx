
import React, { useState, useMemo, useEffect } from 'react';
import { Page } from '../types';
import { getArticles } from '../services/api';

type Category = 'Tümü' | 'Basın Bültenleri' | 'Etkinlikler' | 'Galeri' | 'Kültür & Sanat';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, 'Tümü'>;
  date: string;
  imageUrl: string;
  location?: string;
  slug: string; // Added slug
}



interface BasinKulturSanatProps {
  currentPage: Page;
}

const BasinKulturSanat: React.FC<BasinKulturSanatProps> = () => {
  const [activeTab, setActiveTab] = useState<Category>('Tümü');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const strapiData = await getArticles();
        const formattedArticles: Article[] = strapiData.map((item: any) => {
           // Map Strapi categories to Frontend categories
           let category: any = 'Kültür & Sanat'; // Default
           if (item.category === 'Basin') category = 'Basın Bültenleri';
           if (item.category === 'Kultur') category = 'Kültür & Sanat';
           if (item.category === 'Sanat') category = 'Galeri'; // Assuming Sanat maps to Galeri for now, or create new logic

           // Handle Image URL
           const imageUrl = item.coverImage?.url 
             ? `http://localhost:1337${item.coverImage.url}` 
             : 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=800&auto=format&fit=crop'; // Fallback

           // Extract plain text from blocks for excerpt
           const excerpt = item.content?.[0]?.children?.[0]?.text || '';

           return {
             id: item.documentId || item.id,
             title: item.title,
             excerpt: excerpt,
             category: category,
             date: item.publishedDate,
             imageUrl: imageUrl,
             slug: item.slug,
           };
        });
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeTab === 'Tümü') return articles;
    return articles.filter(art => art.category === activeTab);
  }, [activeTab, articles]);

  const categories: Category[] = ['Tümü', 'Basın Bültenleri', 'Etkinlikler', 'Galeri', 'Kültür & Sanat'];

  const navigateToArticle = (slug: string) => {
    window.location.hash = `article/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-neutral-bg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-brand-neutral-bg min-h-screen animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 text-brand-purple-500 font-bold text-xs uppercase tracking-widest">
            <span className="w-8 h-px bg-brand-purple-500"></span>
            <span>Haberler & Kültür</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-purple-900 leading-tight">
            Basın & Kültür-Sanat
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Mücadelemizi sözle, renkle ve sesle duyuruyoruz. Etkinliklerimizi ve galerimizi buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-brand-purple-100/20 pb-10">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-brand-purple-900 text-white shadow-xl shadow-brand-purple-900/20 scale-105'
                  : 'bg-white text-gray-500 border border-brand-purple-50 hover:border-brand-purple-200 hover:text-brand-purple-900 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className={`grid grid-cols-1 ${activeTab === 'Galeri' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-10`}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div 
                key={article.id} 
                className={`group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-purple-900/10 border border-brand-purple-50/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeTab === 'Galeri' ? 'aspect-[4/5]' : 'min-h-[500px]'}`}
                onClick={() => navigateToArticle(article.slug)} // Added onClick handler
              >
                {/* Image */}
                <div className={`relative ${activeTab === 'Galeri' ? 'h-full' : 'h-64'} overflow-hidden`}>
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-purple-900/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {article.category}
                    </span>
                  </div>

                  {activeTab === 'Galeri' && (
                    <div className="absolute inset-0 bg-brand-purple-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center text-white">
                      <h4 className="font-serif font-bold text-lg mb-2">{article.title}</h4>
                      <p className="text-[10px] uppercase tracking-widest opacity-70">{article.date}</p>
                    </div>
                  )}
                </div>

                {/* Text Info (Only for non-Gallery) */}
                {activeTab !== 'Galeri' && (
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-brand-green-500 font-bold text-xs uppercase tracking-widest">{article.date}</span>
                      {article.location && (
                        <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                          {article.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-purple-900 mb-4 leading-tight group-hover:text-brand-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8 font-light">
                      {article.excerpt}
                    </p>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <button className="text-brand-purple-900 font-bold text-xs uppercase tracking-widest flex items-center group-hover:text-brand-green-500 transition-colors">
                        Devamını Oku
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-400 font-light">Henüz bu kategoride bir içerik bulunmuyor.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasinKulturSanat;
