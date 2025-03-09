import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITableColumnConfig } from '../../globals/types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="min-w-full table-view">
      <thead>
        <tr>
          @for (column of table_columns; track $index){
          <th [ngClass]="{ 'rounded-tl-lg': firstColumn(column), 'rounded-tr-lg': lastColumn(column) }">
            {{ column.header }}
          </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of table_data; track $index) {
        <tr>
          @for (column of table_columns; track column.header_id) {
          <td>
            @if (column.enable_template) {
            <ng-container *ngTemplateOutlet="column.template; context: { data: row }"></ng-container>
            } @else { @if (column.data_type === 'date') {
            {{ getValue(column, row) | date : 'MMM d, y HH:mm' }}
            } @else {
            {{ getValue(column, row) }}
            } }
          </td>
          }
        </tr>
        }
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataComponent {
  @Input({ required: true }) table_columns: ITableColumnConfig[] = [];
  @Input({ required: true }) table_data: any[] = [];
  constructor() {
    console.log(this.table_columns);
    console.log(this.table_data);
  }
  ngOnInit() {
    console.log(this.table_columns);
    console.log(this.table_data);
  }
  getValue(column: ITableColumnConfig, row: any): any {
    if (column.enable_template) return '';
    if (typeof column.accessor_key === 'function') {
      return column.accessor_key(row);
    }
    const value = column.accessor_key?.split('.').reduce((acc, key) => acc?.[key], row);
    if (typeof value === 'object') return;
    return value ?? '';
  }

  firstColumn(column: ITableColumnConfig): boolean {
    return this.table_columns.indexOf(column) === 0;
  }

  lastColumn(column: ITableColumnConfig): boolean {
    return this.table_columns.indexOf(column) === this.table_columns.length - 1;
  }
}
