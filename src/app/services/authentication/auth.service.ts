import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshService } from './refresh.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _userService: UserService,
    private _refreshService: RefreshService) { }

  public async isAuthenticated(): Promise<boolean> {
    const accessTokenValid = !this._userService.accessTokenExpired();
    if(accessTokenValid){
      return true;
    } 
    if(this._userService.refreshTokenExpired()){
      this._userService.removeAllLocalStorage();
      return false;
    } 
    return true;
    // await this._refreshService.ensureAccessToken();
    return !this._userService.accessTokenExpired();
  }
}
