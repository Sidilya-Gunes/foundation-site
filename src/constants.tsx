
import React from 'react';
import { NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { id: 'biz-kimiz', label: 'Hakkımızda' },
  { id: 'basin', label: 'Haberler' },
  { id: 'kalem', label: 'Blog & Makaleler' },
  { id: 'raporlar', label: 'Raporlar' },
  { id: 'iletisim', label: 'İletişim' },
];

export const ICONS = {
  Legal: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52c0 1.354-.112 2.682-.33 3.97m-16.17 0C4.112 7.652 4 6.324 4 4.97M4.185 21c.218-1.288.33-2.616.33-3.97m0 0a4.25 4.25 0 0 1 8.5 0m0 0c0 1.354-.112 2.682-.33 3.97m-.33-3.97a4.25 4.25 0 0 1 8.5 0" />
    </svg>
  ),
  Education: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 15l7.74-4.853a4.125 4.125 0 0 0 0-7.04L12 8.25 4.26 3.107a4.125 4.125 0 0 0 0 7.04Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v9.75m0 0l-3.75-3.75m3.75 3.75l3.75-3.75" />
    </svg>
  ),
  Shelter: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
};
