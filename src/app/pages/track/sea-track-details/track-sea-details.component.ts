import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { StatusCodeToIconPipe } from '../../../shared/pipe/status-code-to-icon.pipe';
import { ITableColumnConfig } from '../../../globals/types/types';
import { TableDataComponent } from '../../../shared/components/table-data.component';

@Component({
  selector: 'app-sea-tracking-details',
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
  templateUrl: './track-sea-details.component.html',
  styleUrl: './track-sea-details.component.css',
})
export class SeaTrackingDetailsComponent {
  tracking_data;
  openContainers: Set<string> = new Set();
  is_table_view = true;
  selected_container_index = 0;
  @ViewChild('eventTemplate') eventTemplate!: TemplateRef<any>;
  @ViewChild('locationTemplate') locationTemplate!: TemplateRef<any>;

  get table_headers(): ITableColumnConfig[] {
    return [
      {
        header: 'Event code',
        header_id: 'event_code',
        enable_template: true,
        data_type: 'string',
        template: this.eventTemplate ?? null,
      },
      {
        header: 'Event Description',
        header_id: 'event_description',
        enable_template: false,
        accessor_key: 'event_description',
        data_type: 'string',
      },
      {
        header: 'Location',
        header_id: 'location',
        enable_template: true,
        template: this.locationTemplate ?? null,
        data_type: 'string',
      },
      {
        header: 'Date & Time',
        header_id: 'date',
        accessor_key: 'date_iso.date',
        data_type: 'date',
        enable_template: false,
      },
    ];
  }
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['tracking_data']) {
      this.tracking_data = nav.extras.state['tracking_data'];
    } else {
      this.router.navigate(['/track']);
    }
  }

  goBack(): void {
    this.router.navigate(['/track']);
  }
  toggleContainer(index: number) {
    if (this.openContainers.has(index.toString())) {
      this.openContainers.delete(index.toString());
    } else {
      this.openContainers.add(index.toString());
    }
  }

  isContainerOpen(index: number): boolean {
    return this.openContainers.has(index.toString());
  }
}
