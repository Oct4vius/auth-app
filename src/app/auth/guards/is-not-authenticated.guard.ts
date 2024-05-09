import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const url = state.url;
  localStorage.setItem('url', url);

  const router = inject(Router)
  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/dashboard')
    return false;
  }

  return true;
};
