import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const cookiesService = inject(CookieService);
  const router = inject(Router);
  if(cookiesService.get('token')){
    // Activate the path to home
    return router.parseUrl('/home');
  }
  else {
    // allow going to login/register pages
    return true;
  }
};
