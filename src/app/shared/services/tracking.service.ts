import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAirline, IShippingLine, TrackingType } from '../../globals/types/types';
import airTrackingData from '../../mock/airTracking.json';
import seaTrackingData from '../../mock/seaTracking.json';
import activeAirLines from '../../mock/activeAirlines.json';
import activeSeaLines from '../../mock/activeShippingLines.json';
import { catchError, Observable, switchMap, takeWhile, tap, throwError, timeout, timer } from 'rxjs';
import { ApiConfigService } from '../../globals/configs/api';
@Injectable({ providedIn: 'root' })
export class TrackingService {
  private user = 'guest';
  private readonly POLLING_INTERVAL = 15000;
  private readonly MAX_DURATION = 4 * 60 * 1000;
  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {}

  public track(type: TrackingType, data: any): Promise<any> {
    if (type !== 'air' && type !== 'sea') {
      return Promise.reject('Unsupported tracking type');
    }
    const url = this.apiConfigService.endpoints.tracking.initiateTracking(this.user, type);
    return new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  public getActiveTrackingCarrier<T>(type: TrackingType): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (type === 'air') {
        resolve(activeAirLines.data as T[]);
      }
      if (type === 'sea') {
        resolve(activeSeaLines.data as T[]);
      }
      reject('Unsupported tracking type');
    });
  }
  longPollingTracking(type: TrackingType, requestId: string): Observable<any> {
    const url = this.apiConfigService.endpoints.tracking.retrieve(this.user, type, requestId);
    return timer(0, this.POLLING_INTERVAL).pipe(
      switchMap(() => {
        console.log('Making polling request...');
        return this.http.get<any>(url).pipe(
          tap((response) => console.log('Received response:', response)),
          catchError((error) => {
            console.error('Polling failed with error:', error);
            return throwError(() => error);
          })
        );
      }),
      takeWhile((response: any) => {
        if (response.success === false) {
          console.log('Stopping polling: success is false');
          return false;
        }
        const shouldContinuePolling = !response.data || Object.keys(response.data).length === 0;
        console.log('Continue polling?', shouldContinuePolling);
        return shouldContinuePolling;
      }, true),
      timeout(this.MAX_DURATION),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Polling timed out after maximum duration');
          return throwError(() => new Error('POLLING_TIMEOUT'));
        }
        return throwError(() => error);
      })
    );
  }

  searchTrackingWithPolling(type: TrackingType, data: any): Observable<string> {
    return new Observable((observer) => {
      this.track(type, data)
        .then((value) => {
          if (!value?.success || !value?.data?.requestId) {
            observer.error('Unable to track the shipment. Please try again later.');
            return;
          }

          this.longPollingTracking(type, value.data.requestId).subscribe({
            next: (response) => {
              if (!response.success) {
                observer.error('Tracking request failed. Please try again.');
                observer.complete();
                return;
              }
              if (!response.data || JSON.stringify(response.data) === '{}') {
                return;
              }

              observer.next(JSON.stringify(response));
              observer.complete();
            },
            error: (error) => {
              observer.error(
                error.message === 'POLLING_TIMEOUT'
                  ? 'Tracking request timed out. Please try again.'
                  : 'Unable to track the shipment. Please try again later.'
              );
            },
          });
        })
        .catch(() => observer.error('Unable to track the shipment. Please try again later.'));
    });
  }
}
