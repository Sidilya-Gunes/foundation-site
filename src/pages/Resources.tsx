
import React, { useState, useEffect } from 'react';
import { getReports } from '../services/api';

interface Report {
  id: string;
  title: string;
  description: string;
  year: string;
  size: string;
  pages?: number;
  category: string;
  fileUrl: string;
}

const Resources: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('Hepsi');
  const [years, setYears] = useState<string[]>(['Hepsi']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const strapiData = await getReports();
        const formattedReports: Report[] = strapiData.map((item: any) => {
           const file = item.file;
           const sizeInMB = file?.size ? (file.size / 1024).toFixed(1) + ' MB' : 'Unknown';
           const year = item.publishedAt ? new Date(item.publishedAt).getFullYear().toString() : '2024';

           return {
             id: item.documentId || item.id,
             title: item.title,
             description: item.description,
             year: year,
             size: sizeInMB,
             category: 'Rapor', // Default category as it's not in schema
             fileUrl: file?.url ? `http://localhost:1337${file.url}` : '#'
           };
        });
        setReports(formattedReports);
        
        // Extract unique years
        const uniqueYears = Array.from(new Set(formattedReports.map(r => r.year))).sort().reverse();
        setYears(['Hepsi', ...uniqueYears]);

      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = selectedYear === 'Hepsi' 
    ? reports 
    : reports.filter(r => r.year === selectedYear);

  if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-purple-900"></div>
       </div>
     );
  }

  return (
    <div className="bg-white min-h-screen py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-brand-purple-500 font-bold text-xs uppercase tracking-widest mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Kurumsal Arşiv</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-purple-900 mb-8 leading-tight">
            Raporlarımız ve Araştırmalar
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Veriye dayalı savunuculuk, toplumsal dönüşümün temelidir. Sahadan topladığımız veriler ve uzman görüşleriyle hazırladığımız tüm yayınlarımıza buradan ulaşabilirsiniz.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-100 pb-8 gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Yıla Göre Filtrele:</span>
            <div className="flex bg-brand-neutral-bg p-1 rounded-xl">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    selectedYear === year 
                      ? 'bg-white text-brand-purple-600 shadow-sm' 
                      : 'text-gray-500 hover:text-brand-purple-400'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Toplam <span className="text-brand-purple-900 font-bold">{filteredReports.length}</span> yayın bulundu.
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div 
                key={report.id} 
                className="group flex flex-col sm:flex-row bg-white rounded-[2rem] border border-gray-100 hover:border-brand-purple-200 hover:shadow-2xl hover:shadow-brand-purple-900/5 transition-all duration-500 overflow-hidden"
              >
                {/* PDF Indicator Side */}
                <div className="sm:w-32 bg-brand-neutral-bg flex flex-col items-center justify-center p-6 sm:p-0 border-b sm:border-b-0 sm:border-r border-gray-100 group-hover:bg-brand-purple-50 transition-colors">
                  <div className="relative">
                    <svg className="w-12 h-12 text-brand-purple-300 group-hover:text-brand-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="absolute bottom-0 right-0 bg-brand-yellow-400 text-brand-purple-900 text-[8px] font-black px-1.5 py-0.5 rounded uppercase leading-none border border-white">PDF</span>
                  </div>
                  <span className="mt-4 text-[10px] font-black text-gray-300 group-hover:text-brand-purple-300 uppercase tracking-widest">{report.year}</span>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-brand-green-500 uppercase tracking-widest bg-brand-green-50 px-2 py-1 rounded">
                      {report.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-brand-purple-900 mb-4 group-hover:text-brand-purple-600 transition-colors leading-snug">
                    {report.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3 text-[11px] text-gray-400 font-medium">
                      {report.pages && (
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                          {report.pages} Sayfa
                        </span>
                      )}
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {report.size}
                      </span>
                    </div>
                    
                    <a 
                      href={report.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-brand-purple-100 hover:bg-brand-purple-200 text-brand-purple-900 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                    >
                      <span>İncele</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-20 text-gray-400 font-light">
                Henüz rapor eklenmemiş.
             </div>
          )}
        </div>

        {/* Help / Contact Section for Researchers */}
        <div className="mt-32 bg-brand-purple-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow-400 rounded-full blur-[100px] opacity-10"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left space-y-6">
              <h2 className="text-4xl font-serif font-bold">Veri Talebi ve İş Birliği</h2>
              <p className="text-lg text-brand-purple-100 font-light">
                Akademik çalışmalarınız veya projeleriniz için ham verilere mi ihtiyacınız var? Araştırma ekibimizle iletişime geçerek detaylı veri talebinde bulunabilirsiniz.
              </p>
            </div>
            <button 
              onClick={() => window.location.hash = 'iletisim'}
              className="bg-brand-yellow-400 text-brand-purple-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-xl whitespace-nowrap"
            >
              İletişime Geçin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
