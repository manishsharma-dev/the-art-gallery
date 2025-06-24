import { Routes } from '@angular/router';
import { pagesRoutes } from './pages/pages.routes';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    children: pagesRoutes,
  },
  {
    path: 'admin',
    children: adminRoutes
  }
];
