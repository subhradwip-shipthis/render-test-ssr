import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, state } from '@angular/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrackingService } from '../../shared/services/tracking.service';
import { TrackingType } from '../../globals/types/types';
import { AirShipmentFormComponent } from './air.form.component';
import { SeaShipmentFormComponent } from './sea.form.component';
import { FadeSlideDirective } from '../../shared/directives/fade-slide-animation.directive';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule, FormsModule, FadeSlideDirective, RouterModule],
  animations: [
    trigger('tabIndicator', [
      state('sea', style({ transform: 'translateX(0)' })),
      state('air', style({ transform: 'translateX(100%)' })),
    ]),
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})
export class TrackComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  setActiveTab(tab: 'sea' | 'air') {
    this.router.navigate(['/track', tab]);
  }
  get active_tab(): TrackingType {
    const childRoute = this.route.firstChild?.snapshot.url[0]?.path;
    return childRoute === 'air' ? 'air' : 'sea';
  }
}
