import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _accessTokenKey : string = "accessToken";
  private readonly _refreshTokenKey : string = "refreshToken";
  private readonly _appInstanceIdKey : string = "appInstanceId";
  constructor(private jwtHelper: JwtHelperService,
    private _router: Router) { }

  public userId(): string {
    const token = this.getAccessToken();
    if(token == null){
      return "";
    }
    let decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.id;
  }

  public accessTokenExpired(): boolean{
    const token = this.getAccessToken();
    if(token == null){
      return false;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  public generateAppInstanceId(): string{
    const appInstanceId = this.getNewAppInstanceId();
    localStorage.setItem(this._appInstanceIdKey, appInstanceId);
    return appInstanceId;
  }

  public getAppInstanceId(): string{
    const appInstanceId = localStorage.getItem(this._appInstanceIdKey);
    if(appInstanceId == null) return "";
    return appInstanceId;
  }

  public setAccessToken(accessToken: string){
    localStorage.setItem(this._accessTokenKey, accessToken);
  }

  public setRefreshToken(refreshToken: string){
    localStorage.setItem(this._refreshTokenKey, refreshToken);
  }

  public getAccessToken(): string | null{
    return localStorage.getItem(this._accessTokenKey);
  }

  public getRefreshToken(): string{
    const refreshToken = localStorage.getItem(this._refreshTokenKey);
    if(refreshToken == null) return "";
    return refreshToken;
  }

  public logout(): void{
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
    localStorage.removeItem(this._appInstanceIdKey);
    // todo remove refresh token entry in database
    this._router.navigate(['/']);
  }

  public refreshTokenExpired(): boolean{
    const token = this.getRefreshToken();
    if(token == null){
      return false;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  private getNewAppInstanceId(): string{
    return this.getRandomInt(100000000, 99999999).toString();
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
