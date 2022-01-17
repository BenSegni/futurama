import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SubscriptionDirective } from '../_helpers/subscription.directive';
import { ApiConfig } from '@api-config';

@Injectable({
  providedIn: 'root',
})
export class GlobalService extends SubscriptionDirective {
  public api: string;
  public port: string;

  constructor(private readonly http: HttpClient) {
    super();
    this.api = ApiConfig.domain;
    this.port = ApiConfig.port;
  }

  /**
   * GET, POST, PUT, DELETE CRUD calls can be added below GET - only needed GET for this example
   * @param endpoint pass endpoint url
   * @returns data from back end
   */

  public get<T>(endpoint: string): Observable<T> {
    const uri = encodeURI(endpoint);

    const encodedUri = `http://${this.api}:${this.port}` + '/' + uri;

    const request: Observable<T> = this.http.get<{ data: T }>(encodedUri).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => {
        console.warn(`listening for state at ${encodedUri}`);
      })
    );

    return request;
  }

  /**
   *
   * @param endpoint string
   * @param body body of data required for POST request
   * @returns { Observable<T> } as resource
   */

  public post<T>(endpoint: string, body: T): Observable<T> {
    const uri = encodeURI(endpoint);

    const encodedUri = `http://${this.api}:${this.port}` + '/' + uri;

    const request: Observable<T> = this.http
      .post<{ data: T }>(encodedUri, body)
      .pipe(
        map((resp: any) => {
          const resource: T = resp?.body?.data;
          return resource;
        }),
        catchError((error) => {
          throw error;
        })
      );

    return request;
  }

  /**
   *
   * @param endpoint string
   * @param body of data required for POST request
   * @returns { Observable<T> } as resource
   */

  public put<T>(endpoint: string, body: T): Observable<T> {
    const uri = encodeURI(endpoint);
    const encodedUri = `http://${this.api}:${this.port}` + '/' + uri;
    const request: Observable<T> = this.http
      .put<{ data: T }>(encodedUri, body)
      .pipe(
        map((resp: any) => {
          const resource: T = resp?.body?.data;
          return resource;
        }),
        catchError((error) => {
          throw error;
        }),
        finalize(() => {
          console.warn(`updated state at ${encodedUri}`);
        })
      );

    return request;
  }

  //TODO: move this npm
  public assignQuery(uri: string, queryParams: QueryParams = {}): string {
    const query: string = Object.entries(queryParams)
      .filter(
        ([key, value]) =>
          typeof value === 'number' ||
          typeof value === 'boolean' ||
          (typeof value === 'string' && value.length)
      )
      .map((entries) => {
        entries[1].toString();

        return entries;
      })
      .map((entries: [string, any]) => entries.join('='))
      .join('&');

    if (query) {
      uri += (uri.indexOf('?') > -1 ? '&' : '?') + query;
    }

    return uri;
  }
}

type QueryParams = { [key: string]: string | number | boolean };
