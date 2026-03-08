
import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/api';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | any[];
  category: string;
  coverImage?: { url: string };
  publishedDate: string;
}

const Hikayeler: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getArticles();
        // Filter for KadininKalemi in frontend since getArticles returns all populated. 
        // Or better yet, we should update getArticles to support category filter, but for now filtering here is fine if dataset is small.
        // Actually, let's use the new query feature we added or just client filter.
        // Since we didn't add category filter to getArticles (only generic query), client filter is safest for now.
        const filtered = allArticles
          .filter((a: any) => a.category === 'Hikayeler' || a.category === 'Makaleler')
          .map((item: any) => ({
            id: item.documentId || item.id,
            title: item.title,
            slug: item.slug,
             // Simple excerpt generation
            content: item.content,
            category: item.category,
            coverImage: item.coverImage,
            publishedDate: item.publishedDate ? new Date(item.publishedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tarih Yok'
          }));
        setArticles(filtered);
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featured = articles[0];
  const others = articles.slice(1);

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-brand-neutral-bg">
         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple-900"></div>
       </div>
    );
  }

  // Fallback if no articles
  if (!featured) {
    return (
      <div className="min-h-screen bg-brand-neutral-bg py-20 text-center">
         <h1 className="text-4xl text-gray-400 font-serif">Henüz yazı eklenmemiş.</h1>
      </div>
    );
  }

  const navigateToArticle = (slug: string) => {
    window.location.hash = `article/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-neutral-bg min-h-screen py-20 animate-in fade-in duration-1000">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-purple-900 italic tracking-tight">Bizim Hikayelerimiz</h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Gönüllülerimizin hikayeleri, ilham veren yazılar ve mücadelemiz üzerine samimi bir köşe. Her kelime bir güç, her hikaye bir dayanışma.
          </p>
          <div className="w-24 h-1 bg-brand-yellow-400 mx-auto mt-8"></div>
        </div>

        {/* Featured Story */}
        <section className="mb-32">
          <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-brand-purple-900/5 flex flex-col lg:flex-row items-stretch border border-brand-purple-50">
            <div className="lg:w-3/5 h-[400px] lg:h-auto overflow-hidden">
              <img 
                src={featured.coverImage?.url ? `http://localhost:1337${featured.coverImage.url}` : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200'} 
                alt={featured.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-brand-green-500 font-bold text-xs uppercase tracking-widest mb-6">
                <span>Öne Çıkan Hikaye</span>
                <span className="w-1 h-1 bg-brand-green-500 rounded-full"></span>
                <span>{featured.publishedDate}</span>
              </div>
              
              <h2 
                onClick={() => navigateToArticle(featured.slug)}
                className="text-3xl md:text-4xl font-serif font-bold text-brand-purple-900 leading-tight mb-6 hover:text-brand-purple-600 cursor-pointer transition-colors"
              >
                {featured.title}
              </h2>
              
              <div className="flex items-center space-x-4 border-t border-gray-100 pt-8 mt-auto">
                <div>
                  <h4 className="font-bold text-brand-purple-900">OpenHeart Gönüllüsü</h4>
                  <p className="text-xs text-gray-400">Yazar</p>
                </div>
                <button 
                  onClick={() => navigateToArticle(featured.slug)}
                  className="ml-auto w-12 h-12 rounded-full bg-brand-purple-500 text-white flex items-center justify-center hover:bg-brand-purple-600 transition-all hover:scale-110 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="space-y-16">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-serif font-bold text-brand-purple-900">Son Hikayeler</h3>
            <div className="h-px flex-1 bg-brand-purple-100 mx-8 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {others.map((story) => (
              <article key={story.id} className="group cursor-pointer" onClick={() => navigateToArticle(story.slug)}>
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg shadow-brand-purple-900/5">
                  <img 
                    src={story.coverImage?.url ? `http://localhost:1337${story.coverImage.url}` : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800'} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 font-medium">
                    <span>{story.publishedDate}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-brand-purple-500">Gönüllü Yazar</span>
                  </div>
                  
                  <h4 className="text-2xl font-serif font-bold text-brand-purple-900 group-hover:text-brand-purple-600 transition-colors leading-tight">
                    {story.title}
                  </h4>
                  
                  <button className="text-brand-green-500 font-bold text-sm flex items-center pt-2 group-hover:translate-x-1 transition-transform">
                    Okumaya Başla
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Authoring */}
        <section className="mt-40 mb-20">
          <div className="bg-brand-purple-900 text-white rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow-400 rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green-500 rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Sizin Sesiniz, Bizim Gücümüz.</h2>
              <p className="text-lg text-brand-purple-100/80 font-light leading-relaxed">
                Hikayenizi anlatmak, kaleminizi dayanışma için kullanmak ister misiniz? Köşemizde sizin yazılarınıza da yer vermek için sabırsızlanıyoruz.
              </p>
              <button onClick={() => window.location.hash='iletisim'} className="bg-brand-yellow-400 text-brand-purple-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                Yazınızı Gönderin
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hikayeler;
