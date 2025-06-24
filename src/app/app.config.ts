import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
  provideAppInitializer,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config-service';
import { LoaderInterceptor } from './shared/interceptors/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    ConfigService,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: 'HTTP_INTERCEPTORS',
      useClass: LoaderInterceptor,
      multi: true
    },
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      await configService.loadConfig();
    }),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
};
