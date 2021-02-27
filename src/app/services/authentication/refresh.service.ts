import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { RefreshTokenValues } from 'src/app/models/auth-models/refresh-token-values';
import { TokenObject } from 'src/app/modules/authentication/login/models/token-object';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private url: string;
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService) {
    this.url = `${BaseUrl.baseUrl}users/refreshtoken`;
  }

  public refreshToken(): Observable<TokenObject> {
    if(this._userService.refreshTokenExpired()){
      this._userService.logout();
    }

    let refreshTokenValues : RefreshTokenValues = { 
      refreshToken : this._userService.getRefreshToken(), 
      appInstanceId: this._userService.getAppInstanceId()
    }
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this._httpClient.post<TokenObject>(this.url, JSON.stringify(refreshTokenValues), { headers: headers }).pipe(tap((tokens: TokenObject) => {
        this._userService.setAccessToken(tokens.accessToken);
        this._userService.setRefreshToken(tokens.refreshToken);
    }));
  }
  
}
