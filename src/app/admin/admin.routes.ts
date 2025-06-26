import { Routes } from '@angular/router';
import { adminGuard } from '../shared/guards/admin-guard';
import { authRoutes } from './auth/auth.routes';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout-components/admin-layout-components').then((m) => m.AdminLayoutComponents),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      }
    ]
  },
  {
    path: 'auth',
    children: authRoutes
  }
];
