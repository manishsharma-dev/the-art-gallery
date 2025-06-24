import { Routes } from '@angular/router';
import { adminGuard } from '../shared/guards/admin-guard';
import { authRoutes } from './auth/auth.routes';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout-components/admin-layout-components').then((m) => m.AdminLayoutComponents),
    canActivate: [adminGuard],
    children: [

    ]
  },
  {
    path: 'auth',
    children: authRoutes
  }
];
