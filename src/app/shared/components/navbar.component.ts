import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface NavbarStyle {
  containerGeneral: string;
  containerScrolled: string;
  linkGeneral: string;
  linkScrolled: string;
}

const NAVBAR_CONFIG: { [key: string]: NavbarStyle } = {
  banner: {
    containerGeneral: 'bg-transparent text-white',
    containerScrolled: 'bg-blue-600 text-white',
    linkGeneral: 'bg-transparent text-white',
    linkScrolled: 'text-white',
  },
  default: {
    containerGeneral: 'bg-transparent text-black',
    containerScrolled: 'bg-blue-600 text-white',
    linkGeneral: 'text-black bg-transparent',
    linkScrolled: 'text-white',
  },
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [ngClass]="containerClasses" class="w-full z-50 transition-colors duration-300 fixed top-0 left-0 right-0">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Title -->
          <div class="flex items-center space-x-2">
            <i class="fas fa-ship text-2xl"></i>
            <span class="text-xl font-bold">Track Cargo</span>
          </div>

          <div class="flex space-x-6">
            <a
              *ngFor="let link of links"
              [routerLink]="link.disabled ? null : link.value"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              [class]="linkClasses + (link.disabled ? ' cursor-not-allowed opacity-100' : ' cursor-pointer')"
              class="px-4 py-2 rounded-md text-sm font-medium inline-flex items-center relative group"
              (click)="link.disabled ? $event.preventDefault() : null"
              [attr.aria-disabled]="link.disabled"
              role="link"
            >
              <i *ngIf="link.icon" [class]="link.icon + ' mr-2'"></i>
              {{ link.label }}
              <span
                *ngIf="link.disabled"
                class="tooltip invisible text-nowrap group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-blue-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
              >
                <span
                  class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-blue-700"
                ></span>
                {{ link.tooltip }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      a.active-link {
        @apply bg-blue-700 text-white;
      }
    `,
  ],
})
export class NavbarComponent {
  is_scrolled = false;
  has_banner = false;
  containerClasses = '';
  linkClasses = '';

  links = [
    { value: '/track', icon: 'fas fa-ship', label: 'Track' },
    { value: '/developer', icon: 'fas fa-code', label: 'Developer', disabled: true, tooltip: 'Coming Soon' },
    // { value: '/about', icon: '', label: 'About Us' },
    // { value: '/contact', icon: 'fas fa-envelope', label: 'Contact Us' },
    // { value: '/pricing', icon: '', label: 'Pricing' },
  ];

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const snapshot = this.router.routerState.snapshot.root.firstChild;
      this.has_banner = snapshot?.data?.['has_banner'] || false;
      console.log(snapshot);
      this.updateStyles();
    });

    this.updateStyles();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const newScrolled = scrollTop > 50;
    if (newScrolled !== this.is_scrolled) {
      this.is_scrolled = newScrolled;
      this.updateStyles();
    }
  }

  updateStyles(): void {
    const configKey = this.has_banner ? 'banner' : 'default';
    const config = NAVBAR_CONFIG[configKey];
    this.containerClasses = this.is_scrolled ? config.containerScrolled : config.containerGeneral;
    this.linkClasses = this.is_scrolled ? config.linkScrolled : config.linkGeneral;
  }
}
