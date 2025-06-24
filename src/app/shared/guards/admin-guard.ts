import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  if (!localStorage.getItem('token')) {
    // If no token is found, redirect to login or show an error
    const router = inject(Router);
    router.navigate(['/admin/auth/login']);
    return false;
  }
  return true;
};
