import { Injectable } from '@angular/core';
import { TrackingType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly base_url: string;
  private readonly MODULES = {
    tracking: 'tracking',
  } as const;

  private readonly moduleVersions: { [key in keyof typeof this.MODULES]: string } = {
    tracking: 'v1',
  };

  constructor() {
    this.base_url = 'https://track-cargo-lts-nightly-100833433961.us-central1.run.app';
  }

  public getApiVersion(module: keyof typeof this.MODULES): string {
    return this.moduleVersions[module] || 'v1';
  }

  public getModuleBaseUrl(module: keyof typeof this.MODULES): string {
    const version = this.getApiVersion(module);
    return `${this.base_url}/api/${module}/api/${version}`;
  }

  public buildUrl(module: keyof typeof this.MODULES, endpoint: string): string {
    return `${this.getModuleBaseUrl(module)}/${endpoint}`;
  }

  public readonly endpoints = {
    tracking: {
      base: (): string => this.getModuleBaseUrl(this.MODULES.tracking),
      initiateTracking: (user: string, type: TrackingType): string =>
        this.buildUrl(this.MODULES.tracking, `services/${type}/${user}`),

      retrieve: (user: string, type: TrackingType, requestId: string): string =>
        this.buildUrl(this.MODULES.tracking, `services/retrieve/${user}/${type}/${requestId}`),

      activeAirlines: (): string => this.buildUrl(this.MODULES.tracking, 'active-airlines'),
      activeSeaLines: (): string => this.buildUrl(this.MODULES.tracking, 'active-shipping-lines'),
    },
  };
}
