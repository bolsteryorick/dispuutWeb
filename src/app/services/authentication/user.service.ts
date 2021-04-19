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
  private readonly _userIdKey : string = "userIdKey";
  constructor(private _jwtHelper: JwtHelperService,
    private _router: Router) { }

  public userId(): string {
    let userId = localStorage.getItem(this._userIdKey);
    if(userId == null){
      userId = this.getUserIdFromToken();
    }
    return userId;
  }

  private getUserIdFromToken(): string{
    const accessToken = localStorage.getItem(this._accessTokenKey) ?? "";
    let decodedToken = this._jwtHelper.decodeToken(accessToken);
    localStorage.setItem(this._userIdKey, decodedToken.id);
    return decodedToken.id;
  }

  public accessTokenExpired(): boolean{
    const token = this.getAccessToken();
    if(token == null){
      return true;
    }
    return this._jwtHelper.isTokenExpired(token);
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
    let decodedToken = this._jwtHelper.decodeToken(accessToken);
    localStorage.setItem(this._userIdKey, decodedToken.id);
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
    this.removeAllLocalStorage();
    this.loadJsFile("https://apis.google.com/js/platform.js");
    let event = new Event("signOut");
    document.dispatchEvent(event);
    this._router.navigate(['/']);
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  public removeAllLocalStorage(): void{
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
    localStorage.removeItem(this._appInstanceIdKey);
    localStorage.removeItem(this._userIdKey);
  }

  public refreshTokenExpired(): boolean{
    const token = this.getRefreshToken();
    if(token == null){
      return true;
    }
    return this._jwtHelper.isTokenExpired(token);
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
