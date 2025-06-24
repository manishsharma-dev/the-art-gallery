import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages-component/pages-component').then((m) => m.PagesComponent),
  },
];
