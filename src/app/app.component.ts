import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ScrollObserveDirective } from './scroll-observe.directive';
import { NgxPaginationModule } from 'ngx-pagination';

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
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    // Wait until the Angular application is stable before removing the loader
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); // Add delay to simulate loading time
        this.scrollToTop();
      }
    });
  }
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
