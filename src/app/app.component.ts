import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ScrollObserveDirective } from './scroll-observe.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { definePreset } from 'primeng/themes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'indowealth-main';
  isDesktopNavbarExpanded = false;
  isLoading = true;
  expandDesktopNavbar() {
    this.isDesktopNavbarExpanded = true;
  }

  collapseDesktopNavbar() {
    this.isDesktopNavbarExpanded = false;
  }
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private config: PrimeNGConfig,
  ) {
    const MyPreset = definePreset(Aura, {
      semantic: {
        colorScheme: {
          light: {
            surface: {
              0: '#ffffff', // Base surface color
              50: '#f9fafb', // Light gray
              100: '#f3f4f6', // Lighter gray
              200: '#e5e7eb', // Gray
              300: '#d1d5db', // Medium gray
              400: '#9ca3af', // Darker gray
              500: '#6b7280', // Dark gray
              600: '#4b5563', // Darker gray
              700: '#374151', // Even darker gray
              800: '#1f2937', // Very dark gray
              900: '#111827', // Almost black
              950: '#030712', // Deepest black
            },
            primary: {
              500: '#10b981', // Emerald green
              // Add other primary shades if needed
            },
            // Add more semantic styles as needed
          },
          dark: {
            surface: {
              0: '#1e1e1e', // Dark background
              50: '#2a2a2a', // Darker gray
              100: '#3a3a3a', // Medium dark gray
              200: '#4a4a4a', // Medium gray
              300: '#5a5a5a', // Light gray
              400: '#6a6a6a', // Light gray
              500: '#7a7a7a', // Lighter gray
              600: '#8a8a8a', // Very light gray
              700: '#9a9a9a', // Almost white
              800: '#e0e0e0', // Lightest gray
              900: '#ffffff', // White
              950: '#ffffff', // White
            },
            primary: {
              500: '#34d399', // Light emerald green
              // Add other primary shades if needed
            },
            // Add more semantic styles as needed
          },
        },
      },
    });
    this.config.theme.set({ preset: MyPreset });
  }

  ngOnInit() {
    // Wait until the Angular application is stable before removing the loader
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
