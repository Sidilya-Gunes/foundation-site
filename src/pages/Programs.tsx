
import React from 'react';
import { ICONS } from '../constants';

const Programs: React.FC = () => {
  return (
    <div className="py-24 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-24 space-y-6">
          <div className="inline-flex items-center space-x-2 text-brand-green-500 font-bold text-xs uppercase tracking-widest">
            <span className="w-8 h-px bg-brand-green-500"></span>
            <span>Neler Yapıyoruz?</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-purple-900 italic leading-tight">Geleceği Birlikte Dönüştürüyoruz.</h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
            Programlarımız, kadınların ihtiyaç duyduğu her noktada yanlarında olmak üzere tasarlandı. Acil hukuki destekten uzun vadeli ekonomik güçlenmeye kadar geniş bir yelpazede hizmet veriyoruz.
          </p>
        </div>

        <div className="space-y-20">
          {/* Program 1: Humanitarian Aid */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row border border-brand-purple-50 group hover:-translate-y-1 transition-all duration-300">
            <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="İnsani Yardım" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-4 text-brand-purple-600">
                <div className="w-12 h-12 bg-brand-purple-50 rounded-xl flex items-center justify-center">
                  <ICONS.Shelter className="w-6 h-6" />
                </div>
                <span className="font-bold tracking-widest uppercase text-xs">İnsani Yardım</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-purple-900 leading-tight">Afet ve Acil Durum Desteği</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                Doğal afetler ve kriz anlarında ihtiyaç sahiplerine hızlı ve etkili yardım ulaştırıyoruz. Barınma, gıda ve hijyen desteği ile hayatın normale dönmesine katkı sağlıyoruz.
              </p>
              <div className="pt-2">
                <button className="text-brand-purple-700 font-bold hover:text-brand-purple-900 transition-colors flex items-center">
                  Daha Fazla Oku <span className="ml-2">&rarr;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Program 2: Education */}
          <div className="bg-brand-green-50 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row-reverse border border-brand-green-100 group hover:-translate-y-1 transition-all duration-300">
            <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Eğitim" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-4 text-brand-green-700">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ICONS.Education className="w-6 h-6" />
                </div>
                <span className="font-bold tracking-widest uppercase text-xs">Eğitim Projeleri</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-purple-900 leading-tight">Geleceğe Umutla Bakış</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Çocuklar ve gençler için eğitim bursları, okul yenileme çalışmaları ve teknoloji atölyeleri düzenleyerek fırsat eşitliği yaratıyoruz.
              </p>
              <div className="pt-2">
                <button className="text-brand-green-700 font-bold hover:text-brand-green-900 transition-colors flex items-center">
                  Projeleri İncele <span className="ml-2">&rarr;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Program 3: Social Support */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row border border-brand-purple-50 group hover:-translate-y-1 transition-all duration-300">
            <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Sosyal Destek" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-4 text-brand-yellow-500">
                <div className="w-12 h-12 bg-brand-yellow-50 rounded-xl flex items-center justify-center">
                  <ICONS.Legal className="w-6 h-6" />
                </div>
                <span className="font-bold tracking-widest uppercase text-xs">Sosyal Hizmetler</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-purple-900 leading-tight">Toplumsal Rehabilitasyon</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                Psikososyal destek merkezlerimiz ve rehabilitasyon projelerimizle, travma mağduru bireylerin topluma yeniden kazandırılmasına destek oluyoruz.
              </p>
              <div className="pt-2">
                <button className="text-brand-purple-700 font-bold hover:text-brand-purple-900 transition-colors flex items-center">
                  Detaylı Bilgi <span className="ml-2">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
