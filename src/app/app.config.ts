import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SanityImagePipe } from './sanity-image.pipe';
import { PortableTextPipe } from './portable-text.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Restore previous scroll position
        anchorScrolling: 'enabled', // Enable anchor scrolling
      }),
    ),
    provideClientHydration(),
    provideAnimations(),
    SanityImagePipe,
    PortableTextPipe,
  ],
};
