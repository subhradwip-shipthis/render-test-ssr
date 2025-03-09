export type TrackingType = 'sea' | 'air';
import { TemplateRef } from '@angular/core';

// need to add proper typed for each tracking type response
interface AirShippingTrackingResponse {}

interface SeaShippingTrackingResponse {}

export interface IAirline {
  airlineCode: string;
  airlineName: string;
  country: string;
  liveStatus: string;
  prefix: string;
}

export interface IShippingLine {
  carrierName: string;
  carrierCode: string;
  scacCodes: string[];
  isPrefixRequired: string;
  liveStatus: string;
}

interface IBaseColumnConfig {
  header: string;
  data_type: 'string' | 'number' | 'date';
  header_id: string;
}

export type ITableColumnConfig =
  | (IBaseColumnConfig & {
      enable_template: false;
      accessor_key: string | Function;
    })
  | (IBaseColumnConfig & {
      enable_template: true;
      template: TemplateRef<any>;
    });

export interface MetaTag {
  name: string;
  content: string;
}
export interface OgTag {
  property: string;
  content: string;
}
export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  metaTags?: MetaTag[];
  ogTags?: OgTag[];
  twitterTags?: MetaTag[];
  jsonLdSchema?: any;
}

export type PageSeoConfig = Record<string, SeoConfig>;
