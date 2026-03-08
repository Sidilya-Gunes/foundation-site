
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-brand-purple-900 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow-400/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPage('home')}>
              <div className="w-12 h-12 bg-brand-yellow-400 rounded-2xl flex items-center justify-center text-brand-purple-900 font-bold text-2xl shadow-lg">O</div>
              <span className="text-3xl font-serif font-bold tracking-tight">OpenHeart</span>
            </div>
            <p className="text-brand-purple-100/70 font-light leading-relaxed">
              Toplumsal dayanışma, eğitim ve sürdürülebilir kalkınma projeleriyle geleceği inşa ediyoruz. Şeffaf, adil ve kapsayıcı bir dünya için çalışıyoruz.
            </p>
            <div className="flex space-x-3">
              {['FB', 'TW', 'IG', 'LI'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-brand-yellow-400 hover:text-brand-purple-900 hover:border-brand-yellow-400 transition-all font-bold text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-b border-white/10 pb-4">Kurumsal</h4>
            <ul className="space-y-4 text-brand-purple-100/70">
              <li><button onClick={() => setPage('home')} className="hover:text-brand-yellow-400 transition-colors">Ana Sayfa</button></li>
              <li><button onClick={() => setPage('biz-kimiz')} className="hover:text-brand-yellow-400 transition-colors">Hakkımızda</button></li>
              <li><button onClick={() => setPage('programs')} className="hover:text-brand-yellow-400 transition-colors">Programlarımız</button></li>
              <li><button onClick={() => setPage('raporlar')} className="hover:text-brand-yellow-400 transition-colors">Raporlar & Yayınlar</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-b border-white/10 pb-4">İletişim</h4>
            <ul className="space-y-5 text-brand-purple-100/70 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 text-brand-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <span>Merkez Ofis<br />İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-brand-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 02 2z" /></svg>
                <span>contact@openheart-ngo.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-brand-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="font-serif font-bold text-lg">+90 (212) 555 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-brand-purple-100/40 text-[10px] uppercase tracking-widest font-bold">
          <p>© 2024 OpenHeart Foundation. Tüm hakları saklıdır.</p>
          <div className="mt-6 md:mt-0 space-x-8">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
