import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getArticles, getReports } from '../services/api';

interface HomeProps {
  setPage: (page: Page) => void;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  cat: string;
  imageUrl: string;
  slug: string;
  author?: string; // Added author
}


interface ReportItem {
  id: string;
  title: string;
  size: string;
  pages: string;
  fileUrl: string;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [kalemArticles, setKalemArticles] = useState<NewsItem[]>([]);
  const [latestReports, setLatestReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, reportsData] = await Promise.all([getArticles(), getReports()]);
        
        // 1. Latest News (excluding KadininKalemi if we want, or just generic latest)
        // Let's filter out KadininKalemi for the main news section to avoid duplication if desired, 
        // OR just show everything except 'KadininKalemi' category for "Gündemden Haberler"
        const newsItems = articlesData
          .filter((item: any) => item.category !== 'KadininKalemi') // Optional: separate them
          .slice(0, 3)
          .map((item: any) => formatArticle(item));
        setLatestNews(newsItems);

        // 2. Kadinin Kalemi (Latest 4)
        const kalemItems = articlesData
          .filter((item: any) => item.category === 'KadininKalemi')
          .slice(0, 4)
          .map((item: any) => formatArticle(item));
        setKalemArticles(kalemItems);

        // 3. Reports (Latest 2)
        const reportItems = reportsData
          .slice(0, 2)
          .map((item: any) => ({
            id: item.documentId || item.id,
            title: item.title,
            size: item.file?.size ? `${(item.file.size / 1024).toFixed(1)} MB` : 'PDF',
            pages: 'Rapor', // Static for now as pages aren't in schema
            fileUrl: item.file?.url
          }));
        setLatestReports(reportItems);

      } catch (error) {
        console.error("Failed to load home data", error);
      }
    };
    fetchData();
  }, []);

  const formatArticle = (item: any): NewsItem => {
    let category: any = 'Kültür-Sanat';
    if (item.category === 'Basin') category = 'Basın Bülteni';
    if (item.category === 'Kultur') category = 'Kültür-Sanat';
    if (item.category === 'KadininKalemi') category = 'Kadının Kalemi';
    
    const imageUrl = item.coverImage?.url 
      ? `http://localhost:1337${item.coverImage.url}` 
      : `https://picsum.photos/seed/${item.id}/800/600`;

    return {
      id: item.documentId || item.id,
      title: item.title,
      date: item.publishedDate,
      cat: category,
      imageUrl: imageUrl,
      slug: item.slug
    };
  };

  const navigateToArticle = (slug: string) => {
    window.location.hash = `article/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredKalem = kalemArticles[0];
  const sideKalem = kalemArticles.slice(1);

  return (
    <div className="animate-in fade-in duration-1000">
      {/* 1. Hero Section - Left Text / Right Image (Warmer Look) */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-neutral-bg rounded-b-[3rem] shadow-sm z-10">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
               <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-brand-purple-100 text-brand-purple-600 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">OpenHeart Foundation</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-serif font-extrabold leading-[1.1] text-brand-purple-900 tracking-tight">
                 Hayaller Ortak,<br/>
                 <span className="text-brand-purple-500">Gelecek Güzel.</span>
               </h1>
               
               <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                 Dayanışma ile güçleniyor, eğitim ve sevgiyle dünyayı değiştiriyoruz. Herkes için eşit ve onurlu bir yaşam mümkün.
               </p>
               
               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                  <button 
                    onClick={() => setPage('biz-kimiz')}
                    className="bg-brand-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-purple-700 transition-all shadow-lg hover:shadow-brand-purple-500/25 active:scale-95 flex items-center justify-center"
                  >
                    Hikayemiz
                  </button>
                  <button 
                    onClick={() => setPage('iletisim')}
                    className="bg-white text-brand-purple-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-purple-50 hover:border-brand-purple-200 transition-all shadow-sm"
                  >
                    Gönüllü Ol
                  </button>
               </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-200 hidden lg:block">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                 <img 
                   src="https://images.unsplash.com/photo-1542810634-71277d95dcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Community Support" 
                   className="w-full object-cover h-[600px] scale-105 hover:scale-100 transition-transform duration-1000"
                 />
                 {/* Floating Card */}
                 <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center space-x-4 max-w-xs animate-bounce-slow">
                    <div className="bg-brand-green-100 p-3 rounded-xl text-brand-green-600">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-brand-purple-900">10K+</p>
                      <p className="text-xs text-brand-purple-500 font-medium uppercase tracking-wide">Mutlu Gönüllü</p>
                    </div>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Latest News Section - Clean Grid */}
      <section className="pt-24 pb-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-purple-900">Haberler & Duyurular</h2>
              <p className="text-gray-500 mt-2">Vakıftan en son gelişmeler ve etkinlikler.</p>
            </div>
            <button 
              onClick={() => setPage('basin')} 
              className="text-brand-purple-600 font-bold hover:text-brand-purple-800 transition-colors flex items-center text-sm"
            >
              Tümünü İncele &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.length > 0 ? (
              latestNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => navigateToArticle(news.slug)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur text-brand-purple-900 text-[10px] font-bold px-3 py-1 rounded-md border border-gray-100 shadow-sm">{news.cat}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brand-green-500 font-semibold mb-2">{news.date}</p>
                    <h3 className="text-xl font-bold text-brand-purple-900 group-hover:text-brand-purple-600 transition-colors line-clamp-2 mb-3 leading-snug">{news.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">...</p>
                  </div>
                </div>
              ))
            ) : (
               <div className="col-span-full py-12 text-center text-gray-400">
                 Henüz yeni bir haber girişi yapılmadı.
               </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Blog & Makaleler Highlight Section */}
      <section className="py-24 bg-brand-purple-50 overflow-hidden border-t border-brand-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-xl">
               <span className="text-brand-purple-600 font-bold uppercase tracking-widest text-xs mb-2 block">Düşünce & Analiz</span>
               <h2 className="text-4xl font-serif font-bold text-brand-purple-900 leading-tight">Blog & Makaleler</h2>
               <p className="text-gray-600 mt-4 text-lg">Alanında uzman isimlerden derinlemesine analizler ve öngörüler.</p>
            </div>
             <button onClick={() => setPage('kalem')} className="hidden md:block text-brand-purple-700 font-bold hover:bg-brand-purple-100 px-6 py-3 rounded-lg transition-colors">
                Tüm Yazıları Gör &rarr;
              </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Article */}
            {featuredKalem ? (
              <div 
                className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-brand-purple-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => navigateToArticle(featuredKalem.slug)}
              >
                <div className="aspect-video overflow-hidden">
                  <img src={featuredKalem.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Yazı" />
                </div>
                <div className="p-8">
                  <span className="text-brand-yellow-500 font-bold text-xs uppercase tracking-widest mb-3 block">Öne Çıkan</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-purple-900 leading-tight mb-4 group-hover:text-brand-purple-600 transition-colors">
                    {featuredKalem.title}
                  </h3>
                  
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-brand-purple-100 flex items-center justify-center text-brand-purple-700 font-bold text-sm">{featuredKalem.author ? featuredKalem.author.substring(0,2).toUpperCase() : 'TD'}</div>
                    <div>
                      <p className="text-sm font-bold text-brand-purple-900">{featuredKalem.author}</p>
                      <p className="text-xs text-gray-400">{featuredKalem.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 p-8 bg-white rounded-2xl text-center text-gray-400 border border-dashed border-gray-200">Henüz yazı yok.</div>
            )}

            {/* Side Column List */}
            <div className="lg:col-span-5 space-y-4">
              {sideKalem.map((item, i) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-transparent hover:border-brand-purple-100 hover:shadow-md transition-all cursor-pointer group" onClick={() => navigateToArticle(item.slug)}>
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={item.title} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-brand-purple-900 group-hover:text-brand-purple-600 transition-colors line-clamp-2 leading-snug mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.author} • {item.date}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => setPage('kalem')} className="md:hidden w-full py-3 mt-4 text-brand-purple-700 font-bold bg-white border border-brand-purple-200 rounded-lg">
                Tüm Yazıları Gör
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Reports Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple-900 mb-4">Raporlar ve Araştırmalar</h2>
            <p className="text-gray-500 font-light text-lg">
              Veriye dayalı savunuculuk için hazırladığımız kapsamlı raporlara buradan erişebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestReports.length > 0 ? latestReports.map((report, i) => (
              <div 
                key={i} 
                onClick={() => report.fileUrl && window.open(`http://localhost:1337${report.fileUrl}`, '_blank')}
                className="group flex p-6 bg-white rounded-xl border border-gray-200 hover:border-brand-purple-500 hover:ring-1 hover:ring-brand-purple-500 transition-all cursor-pointer hover:shadow-lg"
              >
                <div className="w-16 h-20 bg-brand-neutral-bg border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 text-brand-purple-300 group-hover:text-brand-purple-500 transition-colors">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                </div>
                <div className="ml-6 flex-1 flex flex-col justify-center">
                  <h4 className="text-lg font-bold text-brand-purple-900 group-hover:text-brand-purple-700 transition-colors mb-2 pr-4">{report.title}</h4>
                  <div className="flex items-center text-xs text-gray-400 font-medium uppercase tracking-wider space-x-2">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{report.size}</span>
                     <span>PDF İndir</span>
                  </div>
                </div>
                <div className="self-center">
                   <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-purple-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">Henüz yayınlanmış rapor yok.</div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <button onClick={() => setPage('raporlar')} className="text-brand-purple-600 font-semibold hover:text-brand-purple-800 flex items-center mx-auto transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Tüm Arşivi Görüntüle
            </button>
          </div>
        </div>
      </section>

      {/* 5. Call to Action: Solidarity Message (Modern Center) */}
      <section className="py-24 bg-brand-purple-900 relative overflow-hidden text-center">
         <div className="absolute top-0 w-full h-px bg-white/10"></div>
         {/* Simple decoration */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple-800/30 rounded-full blur-3xl pointer-events-none"></div>

         <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Değişimin Parçası Olun</h2>
            <p className="text-brand-purple-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
               Projelerimiz hakkında daha fazla bilgi almak veya destek olmak için bizimle iletişime geçin.
            </p>
            <div className="flex justify-center gap-4">
               <button 
                  onClick={() => setPage('iletisim')}
                  className="bg-brand-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-green-400 transition-all shadow-lg hover:shadow-brand-green-500/30"
               >
                  Bize Ulaşın
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
