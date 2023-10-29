import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { LoginData } from '../../models/login-data.model';
import { Observable } from 'rxjs';
import { AuthData } from '../../models/auth-data.model';
import { ApiLabel } from '../../../core/models/api-route.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private readonly httpService: ServerHttpService) {
  }

  login<T>(loginData: LoginData): Observable<AuthData> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic cHVibGljOg==');

    let formData = new FormData();
    formData.set('grant_type', 'password');
    formData.set('password', loginData.password);
    formData.set('username', loginData.username);

    return this.httpService.postAuthWithLabelDeserialized(AuthData, ApiLabel.LOGIN, formData, undefined, undefined, headers);
  }

  refreshToken(refreshToken: string): Observable<AuthData> {
    // TODO
    // return throwError(new Error('refreshToken NOT IMPLEMENTED'));
    return this.httpService.postAuthWithLabelDeserialized<any, AuthData, AuthData>(AuthData, ApiLabel.REFRESH, { refreshToken });
  }

}
