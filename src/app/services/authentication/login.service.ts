import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { UserCredentials } from 'src/app/models/auth-models/userCredentials';
import { TokenObject } from 'src/app/modules/authentication/login/models/token-object';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrl}users/gettoken`;
  }

  public login(userCredentials: UserCredentials): Observable<TokenObject> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<TokenObject>(this.url, JSON.stringify(userCredentials), { headers: headers });
  }
}