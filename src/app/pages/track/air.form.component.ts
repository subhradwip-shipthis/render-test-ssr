import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackingService } from '../../shared/services/tracking.service';
import { IAirline } from '../../globals/types/types';
import { FadeSlideDirective } from '../../shared/directives/fade-slide-animation.directive';
import { Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
@Component({
  selector: 'app-air-shipment-form',
  template: `
    <div class="space-y-6" fadeSlide>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Air Shipment Tracking</label>
        <input
          type="text"
          [(ngModel)]="data.awb"
          class="input-field"
          placeholder="Enter tracking number"
          (keyup.enter)="onSubmit()"
        />
      </div>
      @if(error_message){
      <div class="text-red-500 text-sm font-medium">{{ error_message }}</div>
      }
      <button (click)="onSubmit()" [disabled]="is_loading || !data.awb" class="btn-primary w-full">
        <i
          class="fas mr-2"
          [ngClass]="{
            'fa-search': !is_loading,
            'fa-plane plane-animation': is_loading
          }"
        ></i>
        <span *ngIf="!is_loading">Track Air Shipment</span>
        <span *ngIf="is_loading">Loading...</span>
      </button>
    </div>
  `,
  styles: [
    `
      @keyframes fly {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-1px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      .plane-animation {
        animation: fly 1.5s ease-in-out infinite;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, FadeSlideDirective],
})
export class AirShipmentFormComponent {
  is_loading: boolean = false;
  submit: EventEmitter<any> = new EventEmitter();
  is_fetching = false;
  data = {
    awb: '',
  };
  AWB_REGEX = /^[0-9]{11}$/;
  all_airlines: IAirline[] = [];
  error_message = '';

  constructor(private trackingService: TrackingService, private router: Router, private seoService: SeoService) {
    this.seoService.setSeoConfig('track/air');
  }

  onSubmit(): void {
    if (!this.data.awb) return;
    if (!this.AWB_REGEX.test(this.data.awb)) {
      this.error_message = 'Invalid AWB format. Please enter a valid AWB number.';
      return;
    }

    this.error_message = '';
    this.updateState(true, '');

    this.trackingService.searchTrackingWithPolling('air', this.data).subscribe({
      next: (response) => {
        this.updateState(false, '');
        this.router.navigate([`/track/air/${this.data.awb}`], { state: { tracking_data: JSON.parse(response).data } });
      },
      error: (errorMessage) => {
        this.updateState(false, errorMessage);
      },
    });
  }
  updateState(isLoading: boolean, errorMessage: string) {
    this.is_loading = isLoading;
    this.error_message = errorMessage;
  }
}
