import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileNavbarOpen = false;
  isDesktopNavbarExpanded = false;

  toggleMobileNavbar() {
    this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
  }

  expandDesktopNavbar() {
    this.isDesktopNavbarExpanded = true;
  }

  collapseDesktopNavbar() {
    this.isDesktopNavbarExpanded = false;
  }
}
