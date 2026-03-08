
export interface Resource {
  id: string;
  title: string;
  excerpt: string;
  category: 'Report' | 'Article' | 'Legal Aid' | 'Advocacy';
  date: string;
  author: string;
  imageUrl: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

// Fixed: Added missing page identifiers 'basin-bultenleri', 'etkinlikler', and 'galeri' to match usage in App.tsx routing
export type Page = 
  | 'home' 
  | 'biz-kimiz' 
  | 'basin' 
  | 'basin-bultenleri'
  | 'etkinlikler'
  | 'galeri'
  | 'kalem' 
  | 'raporlar' 
  | 'iletisim' 
  | 'programs';

export interface NavLink {
  id: Page;
  label: string;
  subItems?: { id: Page; label: string }[];
}
