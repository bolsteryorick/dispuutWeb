import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtHelper: JwtHelperService) { }

  public userId(): string {
    const token = localStorage.getItem('token');
    if(token == null){
      return "";
    }
    let decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.id;
  }
}
