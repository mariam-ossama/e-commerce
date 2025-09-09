import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/Interceptors/headers/headers-interceptor';
import { errorsInterceptor } from './core/Interceptors/error/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/Interceptors/loading/loading-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top'
    }
    )),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorsInterceptor,loadingInterceptor])),
    provideAnimations(),
    importProvidersFrom(CookieService,NgxSpinnerModule),
    provideToastr(),
  ]
};

