import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  if (!localStorage.getItem('_t')) {
    // If no token is found, redirect to login or show an error
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
