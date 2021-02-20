import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  public async ensureAccessToken(): Promise<void>{
    if(!this._userService.accessTokenExpired) return;
    const request = this.refreshToken();
    const tokenObject = await request.toPromise();
    this._userService.setAccessToken(tokenObject.accessToken);
    this._userService.setRefreshToken(tokenObject.refreshToken);
  }

  private refreshToken(): Observable<TokenObject> {
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
    return this._httpClient.post<TokenObject>(this.url, JSON.stringify(refreshTokenValues), { headers: headers });
  }


  
}
