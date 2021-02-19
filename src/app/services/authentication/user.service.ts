import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _accessTokenKey : string = "accessToken";
  private readonly _refreshTokenKey : string = "refreshToken";
  constructor(private jwtHelper: JwtHelperService) { }

  public userId(): string {
    const token = this.getAccesstoken();
    if(token == null){
      return "";
    }
    let decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.id;
  }

  public accessTokenExpired(): boolean{
    const token = this.getAccesstoken();
    if(token == null){
      return false;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  public setAccesstoken(accessToken: string){
    localStorage.setItem(this._accessTokenKey, accessToken);
  }

  public setRefreshtoken(refreshToken: string){
    localStorage.setItem(this._refreshTokenKey, refreshToken);
  }

  public getAccesstoken(): string | null{
    console.log("hey")
    return localStorage.getItem(this._accessTokenKey);
  }

  public getRefreshtoken(): string | null{
    return localStorage.getItem(this._refreshTokenKey);
  }

  public removeTokens(): void{
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }
}
