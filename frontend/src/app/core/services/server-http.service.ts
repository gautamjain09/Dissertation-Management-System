import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isEmpty } from 'lodash-es';
import { SettingsService } from './settings.service';
import { RequestParams } from '../models/request-param.model';
import { ApiLabel } from '../models/api-route.model';
import { FakeData } from '../../../fakes/fake.data';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { Deserialize, INewable, Serialize } from 'cerialize';

export type Serializable<T> = INewable<T>;

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  constructor(private readonly http: HttpClient,
              private readonly settingsService: SettingsService,
              private readonly spinnerService: SpinnerService) {
  }

  private get baseUrl(): string {
    return this.settingsService.serverBaseUrl;
  }

  private get oauthServerBaseUrl(): string {
    return this.settingsService.authServerBaseUrl;
  }

  postAuthWithLabelDeserialized<R, V, T = V | V[]>(type: Serializable<V>, apiLabel: ApiLabel, body: R, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.postWithLabelDeserialized<R, V, T>(type, this.oauthServerBaseUrl, apiLabel, body, params, query, headers);
  }

  getApiWithLabelDeserialized<V, T extends V | V[]>(type: Serializable<V>, apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.getWithLabelDeserialized<V, T>(type, this.baseUrl, apiLabel, params, query, headers);
  }

  postApiWithLabelSerializedDeserialized<R, V, T = V | V[]>(type: Serializable<V>, apiLabel: ApiLabel, body: R, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.postWithLabelSerializedDeserialized<R, V, T>(type, this.baseUrl, apiLabel, body, params, query, headers);
  }

  private getWithLabelDeserialized<V, T = V | V[]>(type: Serializable<V>, baseUrl: string, apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.getWithLabel(baseUrl, apiLabel, params, query, headers).pipe(map(json => Deserialize(json, type)));
  }

  private postWithLabelSerializedDeserialized<R, V, T = V | V[]>(type: Serializable<V>, baseUrl: string, apiLabel: ApiLabel, body?: R, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.postWithLabel(baseUrl, apiLabel, Serialize(body), params, query, headers).pipe(map(json => Deserialize(json, type)));
  }

  private postWithLabelDeserialized<R, V, T = V | V[]>(type: Serializable<V>, baseUrl: string, apiLabel: ApiLabel, body?: R, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.postWithLabel(baseUrl, apiLabel, body, params, query, headers).pipe(map(json => Deserialize(json, type)));
  }

  private postWithLabelSerialized<R, T>(baseUrl: string, apiLabel: ApiLabel, body?: R, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.postWithLabel(baseUrl, apiLabel, Serialize(body), params, query, headers);
  }

  private getWithLabel<T>(baseUrl: string, apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel, query);
    }
    return this.get(baseUrl, urlTemplate, params, query, headers);
  }

  private postWithLabel<R, T>(baseUrl: string, apiLabel: ApiLabel, body?: R, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel);
    }
    return this.post(baseUrl, urlTemplate, body, params, query, headers);
  }

  private get<T>(baseUrl: string, pathTemplate: string, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(baseUrl, path);
    return this.http.get<T>(url, { headers });
  }

  private post<R, T>(baseUrl: string, pathTemplate: string, body?: R, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(baseUrl, path);
    return this.http.post<T>(url, body, { headers });
  }

  private buildPath(url: string, params?: RequestParams, query?: RequestParams): string {
    const parameters = params?.getAll() ?? [];
    const queryParams = query?.getAll() ?? [];
    const urlWithParams = parameters.reduce((workingUrl, param) =>
      workingUrl.replace(`:${param.key}`, param.value), url);
    const queryTail = queryParams.map(param => `${param.key}=${param.value}`).join('&');
    return isEmpty(queryTail) ? urlWithParams : `${urlWithParams}?${queryTail}`;
  }

  private joinPathParts(...parts: string[]): string {
    if (isEmpty(parts)) {
      return '';
    }
    const firstPart = parts[0].replace(/(?<=.)\/$/, '');
    const items = parts.slice(1).map(item => item.replace(/^\/|\/$/g, ''));
    items.unshift(firstPart);
    return items.filter(item => !isEmpty(item)).join('/');
  }

  private doFakeRequest<T>(apiLabel: ApiLabel, query?: RequestParams): Observable<T> {
    const time = this.settingsService.fakeApiDelay();
    return of(FakeData.handleApiLabel(apiLabel, query)).pipe(
      tap(() => this.spinnerService.showFor(time)),
      delay(time)
    );
  }

}
