import { Injectable } from '@angular/core';
import { AIRLINE_STATUS_ICON } from '../../globals/constants/airline.status.icon.mapper';
import { SHIPPING_STATUS_ICON } from '../../globals/constants/shiping.status.icon.mapper';
import { TrackingType } from '../../globals/types/types';
@Injectable({
  providedIn: 'root',
})
export class IconService {
  AIRLINE_STATUS_ICON = AIRLINE_STATUS_ICON;
  SHIPPING_STATUS_ICON = SHIPPING_STATUS_ICON;
  constructor() {}

  private getAirlineStatusIcon(code: string): string {
    console.log(code);
    return this.AIRLINE_STATUS_ICON[code] || 'fa-question';
  }

  private getShippingLineIcon(code: string): string {
    return this.SHIPPING_STATUS_ICON[code] || 'fa-question';
  }
  public getIcon(code: string, type: TrackingType): string {
    if (type === 'sea') {
      return this.getShippingLineIcon(code);
    }
    return this.getAirlineStatusIcon(code);
  }
}
