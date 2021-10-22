import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SubscriptionDirective } from '../_helpers/subscription.directive';
import { ApiConfig } from './api.enum';

@Injectable({
  providedIn: 'root',
})
export class GlobalService extends SubscriptionDirective {
  public api = ApiConfig.api;

  constructor(private readonly http: HttpClient) {
    super();
  }

  private handleGetResponse<T>(response: any, uri: string): any {
    const resource: T = response;

    return resource;
  }

  private handleGetError(error: any): any {
    throw error;
  }

  public get<T>(endpoint: string): Observable<T> {
    const uri = encodeURI(endpoint);

    const encodedUri = this.api + '/' + uri;

    const request: Observable<T> = this.http.get<T>(encodedUri).pipe(
      map((response) => this.handleGetResponse(response, encodedUri)),
      catchError((error) => this.handleGetError(error)),
      finalize(() => {
        console.log('completed get and now listening for state');
      })
    );

    return request;
  }
}
