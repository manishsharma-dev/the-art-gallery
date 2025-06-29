import { Routes } from '@angular/router';
import { pagesRoutes } from './pages/pages.routes';
import { adminRoutes } from './admin/admin.routes';
import { authRoutes } from './auth/auth.routes';
import { authGuard } from './shared/guards/auth-guard';
import { adminGuard } from './shared/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    children: pagesRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    children: adminRoutes,
    canActivate: [authGuard, adminGuard]    
  },
  {
    path: 'auth',
    children : authRoutes
  }
];
