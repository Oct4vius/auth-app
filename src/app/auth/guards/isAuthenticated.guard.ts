import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const url = state.url;
  localStorage.setItem('url', url);

  const router = inject(Router)
  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }

  router.navigateByUrl('/auth/login')
  return false;
};

