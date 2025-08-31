import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookiesService = inject(CookieService);
  const router = inject(Router);
  if(cookiesService.get('token')){
    // Activate the path
    return true;
  }
  else {
    // deactivate path
    // keep on the page
    return router.parseUrl('/login');
  }
};
