
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Narrative Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 text-brand-purple-500 font-bold text-xs uppercase tracking-widest">
                <span className="w-8 h-px bg-brand-purple-500"></span>
                <span>Hikayemiz</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-purple-900 leading-tight">Mücadeleyle Geçen Yıllar</h1>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  2015 yılında bir grup gönüllü ve hayırsever tarafından temelleri atılan OpenHeart Foundation, basit ama derin bir gerçeğin fark edilmesiyle doğdu: Dayanışma, değişim için en güçlü aracımızdır.
                </p>
                <p>
                  Küçük bir topluluk girişimi olarak başlayan yolculuğumuz, bugün binlerce kişiye ulaşan bir umut ışığına dönüştü. Dezavantajlı gruplar için eşit fırsatlar yaratmak ve toplumsal adaleti savunmak için çalışıyoruz.
                </p>
                <p>
                  Misyonumuz sadece yardımlaşmak değil, kalıcı çözümler üretmektir. Eğitim, sağlık ve savunuculuk projelerimizle, daha adil bir dünya için köprüler kuruyoruz.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-yellow-400 rounded-3xl rotate-3 opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-green-500 rounded-2xl z-0 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop" 
                alt="Dayanışma Grubu" 
                className="relative z-10 w-full h-[550px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-brand-neutral-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple-100/30 rounded-full blur-[120px] -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple-900">Temel Değerlerimiz</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Bizi biz yapan ve her adımda rehber edindiğimiz ilkelerimiz.</p>
            <div className="w-20 h-1.5 bg-brand-green-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Kapsayıcılık', desc: 'Dil, din, ırk ve cinsiyet ayrımı gözetmeksizin, toplumun her kesimi için eşit ve adil bir yaşamı savunuyoruz.', icon: '🌈' },
              { title: 'Şeffaflık', desc: 'Bağışçılarımıza ve gönüllülerimize karşı her zaman hesap verebilir, açık ve dürüst bir yönetim anlayışını benimsiyoruz.', icon: '🛡️' },
              { title: 'Sürdürülebilirlik', desc: 'Geçici çözümler değil, kalıcı etkiler yaratan projelerle toplumsal kalkınmaya destek oluyoruz.', icon: '🌱' }
            ].map((value, idx) => (
              <div key={idx} className="group bg-white p-12 rounded-3xl shadow-sm border border-brand-purple-50 hover:shadow-2xl hover:shadow-brand-purple-900/5 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">{value.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-brand-purple-900 mb-6">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
             <h2 className="text-4xl font-serif font-bold text-brand-purple-900 text-center md:text-left">Yönetim ve Ekibimiz</h2>
             <p className="text-gray-500 max-w-md text-center md:text-right italic">"Birlikte çalışarak, dünyayı değiştirecek güce sahibiz."</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { name: "Ayşe Yılmaz", role: "Kurucu & Başkan" },
               { name: "Mehmet Demir", role: "Genel Sekreter" },
               { name: "Zeynep Kaya", role: "Proje Koordinatörü" },
               { name: "Can Yıldız", role: "İletişim Direktörü" }
             ].map((member, i) => (
               <div key={i} className="text-center group">
                 <div className="relative w-48 h-48 mx-auto mb-8">
                   <div className="absolute inset-0 bg-brand-purple-100 rounded-full scale-105 group-hover:bg-brand-yellow-400 transition-colors duration-500"></div>
                   <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                     <img src={`https://picsum.photos/seed/member${i + 40}/400/400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                   </div>
                 </div>
                 <h4 className="text-xl font-bold text-brand-purple-900 mb-1">{member.name}</h4>
                 <p className="text-brand-green-500 font-semibold text-sm uppercase tracking-widest">{member.role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24 bg-brand-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Ulaşılan Kişi', value: '50.000+' },
              { label: 'Aktif Gönüllü', value: '1.200+' },
              { label: 'Tamamlanan Proje', value: '85+' },
              { label: 'Desteklenen İl', value: '12' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-serif font-bold text-brand-yellow-400">{stat.value}</div>
                <div className="text-sm text-brand-purple-100/60 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
