import { Pipe, PipeTransform } from '@angular/core';
import { TrackingType } from '../../globals/types/types';
import { IconService } from '../services/icon.service';
@Pipe({
  name: 'status_to_icon',
  pure: true,
  standalone: true,
})
export class StatusCodeToIconPipe implements PipeTransform {
  constructor(private iconService: IconService) {}

  transform(event_code: string, type: TrackingType): string {
    return this.iconService.getIcon(event_code, type);
  }
}
