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
  isMobileSubmenuOpen = false;
  isMobileNavbarOpen2 = false;
  isMobileSubmenuOpen2 = false;
  isMobileNavbarOpen3 = false;
  isMobileSubmenuOpen3 = false;
  isDesktopSubmenuOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMobileNavbar() {
    this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
    if (!this.isMobileNavbarOpen) {
      this.isMobileSubmenuOpen = false;
      this.isMobileSubmenuOpen2 = false;
      this.isMobileSubmenuOpen3 = false;
    }
  }

  toggleMobileSubmenu() {
    this.isMobileSubmenuOpen = !this.isMobileSubmenuOpen;
  }

  toggleMobileSubmenu2() {
    this.isMobileSubmenuOpen2 = !this.isMobileSubmenuOpen2;
  }

  toggleMobileSubmenu3() {
    this.isMobileSubmenuOpen3 = !this.isMobileSubmenuOpen3;
  }

  toggleDesktopSubmenu() {
    this.isDesktopSubmenuOpen = !this.isDesktopSubmenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMobileNavbarOpen = false;
      this.isMobileSubmenuOpen = false;
      this.isDesktopSubmenuOpen = false;
    }
  }
}
