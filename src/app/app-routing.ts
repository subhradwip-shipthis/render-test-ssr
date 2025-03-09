import { RouterModule, Routes } from '@angular/router';
import { SeaShipmentFormComponent } from './pages/track/sea.form.component';
import { AirShipmentFormComponent } from './pages/track/air.form.component';
import { TrackComponent } from './pages/track/track.component';

export const routes: Routes = [
  { path: '', redirectTo: '/track', pathMatch: 'full' },
  {
    path: 'track',
    component: TrackComponent,
    data: { has_banner: true },
    children: [
      { path: '', redirectTo: 'sea', pathMatch: 'full' },
      { path: 'sea', component: SeaShipmentFormComponent },
      { path: 'air', component: AirShipmentFormComponent },
    ],
  },
  {
    path: 'track/air/:id',
    loadComponent: () =>
      import('./pages/track/air-track-details/track-air-details.component').then((m) => m.AirTrackingDetailsComponent),
    data: { has_banner: true },
  },
  {
    path: 'track/sea/:id',
    loadComponent: () =>
      import('./pages/track/sea-track-details/track-sea-details.component').then((m) => m.SeaTrackingDetailsComponent),
    data: { has_banner: true },
  },
  {
    path: 'developer',
    loadComponent: () => import('./pages/developer/developer.component').then((m) => m.DeveloperComponent),
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  // },
  // {
  //   path: 'contact',
  //   loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  //   data: { has_banner: true },
  // },

  // {
  //   path: 'pricing',
  //   loadComponent: () => import('./pages/pricing/pricing.component').then((m) => m.PricingComponent),
  // },
];
