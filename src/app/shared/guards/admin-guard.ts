import { UserData } from './../models/login.model';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
export const adminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  if (!localStorage.getItem('_t')) {
    router.navigate(['/auth/login']);
    return false;
  } else {
    const storageService: StorageService = inject(StorageService);
    const userData = await storageService.getItem('_u');
    if (!userData) {
      router.navigate(['/auth/login']);
      return false;
    }
    if (JSON.parse(userData)?.UserData.userType.shortCode === 'US') {
      const router = inject(Router);
      router.navigate(['/']);
      return false;
    }
  }
  return true;
};
