import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IShippingLine } from '../../globals/types/types';
import { TrackingService } from '../../shared/services/tracking.service';
import { FadeSlideDirective } from '../../shared/directives/fade-slide-animation.directive';
import { Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-sea-shipment-form',
  template: `
    <div class="space-y-6" fadeSlide>
      <div class="flex w-full space-x-4">
        <div class="w-2/3">
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Shipping Line</label>
          <div class="relative">
            <select
              [(ngModel)]="data.scacCode"
              class="input-field appearance-none pr-10 truncate"
              [disabled]="is_fetching"
            >
              @for(line of all_shipping_lines;track line.carrierCode){
              <option [value]="line.scacCodes[0]">{{ line.carrierName }} ({{ line.carrierCode }})</option>
              }
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div *ngIf="is_fetching" class="mt-2 text-sm text-gray-500">
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Loading shipping lines...
          </div>
        </div>
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700 mb-2">Sea Shipment Tracking</label>
          <input type="text" [(ngModel)]="data.mbl" class="input-field" placeholder="Enter tracking number" />
        </div>
      </div>
      @if(error_message){
      <div class="text-red-500 text-sm font-medium">{{ error_message }}</div>
      }
      <button (click)="onSubmit()" [disabled]="is_loading || !data.mbl || !data.scacCode" class="btn-primary w-full">
        <i
          class="fas mr-2"
          [ngClass]="{
            'fa-search': !is_loading,
            'fa-ship ship-animation': is_loading
          }"
        ></i>

        <span>@if(!is_loading){Track Sea Shipment}@else{ Loading... }</span>
      </button>
    </div>
  `,
  styles: [
    `
      @keyframes float {
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
      .ship-animation {
        animation: float 1.5s ease-in-out infinite;
      }
    `,
  ],
  imports: [CommonModule, FormsModule, FadeSlideDirective],
  standalone: true,
})
export class SeaShipmentFormComponent {
  is_loading: boolean = false;
  submit: EventEmitter<any> = new EventEmitter();

  data = {
    scacCode: '',
    mbl: '',
  };

  is_fetching = false;
  all_shipping_lines: IShippingLine[] = [];
  error_message = '';
  TRACKING_ID_REGEX = /^(?:[A-Z]{4}\d{6}\d|[A-Z0-9]{9,17}|[A-Z]{3,4}\d{6,10})$/;
  constructor(private trackingService: TrackingService, private router: Router, private seoService: SeoService) {
    this.seoService.setSeoConfig('track/sea');
  }
  ngOnInit() {
    this.is_fetching = true;
    this.trackingService.getActiveTrackingCarrier<IShippingLine>('sea').then((response: IShippingLine[]) => {
      this.is_fetching = false;
      this.all_shipping_lines = response;
      this.data.scacCode = response[0].scacCodes[0];
    });
  }

  onSubmit(): void {
    if (!this.data.scacCode || !this.data.mbl) return;
    if (!this.TRACKING_ID_REGEX.test(this.data.mbl)) {
      this.error_message = 'Invalid tracking number. Put a valid MBL number';
      return;
    }
    this.updateState(true, '');

    this.trackingService.searchTrackingWithPolling('sea', this.data).subscribe({
      next: (response: any) => {
        this.updateState(false, '');
        this.router.navigate([`/track/sea/${this.data.mbl}`], {
          state: { tracking_data: JSON.parse(response).data },
        });
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
