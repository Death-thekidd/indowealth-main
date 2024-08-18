import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileNavbarOpen = false;
  isDesktopNavbarExpanded = false;
  isFloatingMenuOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMobileNavbar() {
    this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
  }

  expandDesktopNavbar() {
    this.isDesktopNavbarExpanded = true;
  }

  collapseDesktopNavbar() {
    this.isDesktopNavbarExpanded = false;
  }
  toggleFloatingMenu(event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    this.isFloatingMenuOpen = !this.isFloatingMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close floating menu if clicked outside
    if (!this.el.nativeElement.contains(event.target)) {
      this.isFloatingMenuOpen = false;
      this.isMobileNavbarOpen = false;
    }
  }
}
