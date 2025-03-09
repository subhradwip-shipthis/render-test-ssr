import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { StatusCodeToIconPipe } from '../../../shared/pipe/status-code-to-icon.pipe';
import { ITableColumnConfig } from '../../../globals/types/types';
import { TableDataComponent } from '../../../shared/components/table-data.component';

@Component({
  selector: 'app-air-tracking-details',
  standalone: true,
  imports: [CommonModule, StatusCodeToIconPipe, TableDataComponent],
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
        ]),
      ]),
    ]),
  ],
  templateUrl: './track-air-details.component.html',
  styleUrl: './track-air-details.component.css',
})
export class AirTrackingDetailsComponent {
  tracking_data;
  is_table_view: boolean = true;
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['tracking_data']) {
      console.log(nav.extras.state['tracking_data']);
      this.tracking_data = nav.extras.state['tracking_data'];
    } else {
      this.router.navigate(['/track']);
    }
  }
  @ViewChild('eventTemplate') eventTemplate!: TemplateRef<any>;
  @ViewChild('locationTemplate') locationTemplate!: TemplateRef<any>;

  get air_table_headers(): ITableColumnConfig[] {
    return [
      {
        header: 'Event Code',
        header_id: 'event_code',
        enable_template: true,
        data_type: 'string',
        template: this.eventTemplate ?? null, // Use template if available
      },
      {
        header: 'Event Description',
        header_id: 'event_description',
        enable_template: false,
        accessor_key: 'carrier_event_description',
        data_type: 'string',
      },
      {
        header: 'Location',
        header_id: 'location',
        enable_template: true,
        template: this.locationTemplate ?? null, // Use template if available
        data_type: 'string',
      },
      {
        header: 'Date & Time',
        header_id: 'date',
        accessor_key: 'date_iso.date',
        data_type: 'date',
        enable_template: false,
      },
      {
        header: 'Flight No.',
        header_id: 'flight_no',
        enable_template: false,
        accessor_key: 'flight_no',
        data_type: 'string',
      },
      {
        header: 'Pieces',
        header_id: 'pieces',
        enable_template: false,
        accessor_key: 'pieces',
        data_type: 'number',
      },
      {
        header: 'Weight',
        header_id: 'weight',
        enable_template: false,
        accessor_key: (row: any) => `${row.weight || ''} ${row.weight_unit?.toUpperCase() || ''}`,
        data_type: 'string',
      },
    ];
  }
  get sorted_events(): any[] {
    if (!this.tracking_data?.events) {
      return [];
    }
    return [...this.tracking_data.events].sort((a, b) => b.date.$date - a.date.$date);
  }

  go_back(): void {
    this.router.navigate(['/track']);
  }
}
