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
  activeSubmenu: HTMLElement | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMobileNavbar() {
    this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
  }

  expandDesktopNavbar() {
    this.isDesktopNavbarExpanded = true;
  }

  collapseDesktopNavbar() {
    this.isDesktopNavbarExpanded = false;
    this.closeSubmenu();
  }

  toggleSubmenu(event: Event) {
    event.stopPropagation(); // Prevent event bubbling

    const targetElement = event.currentTarget as HTMLElement;
    const parentLi = targetElement.parentElement;

    if (parentLi && parentLi.classList.contains('submenu-open')) {
      this.closeSubmenu();
    } else {
      this.closeSubmenu();
      if (parentLi) {
        parentLi.classList.add('submenu-open');
        this.activeSubmenu = parentLi.querySelector('.submenu') as HTMLElement;
      }
    }
  }

  closeSubmenu() {
    if (this.activeSubmenu) {
      const parentLi = this.activeSubmenu.closest('li');
      if (parentLi) {
        parentLi.classList.remove('submenu-open');
      }
      this.activeSubmenu = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMobileNavbarOpen = false;
      this.closeSubmenu();
    }
  }
}
