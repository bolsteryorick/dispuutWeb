import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GoogleRegisterValues, UserRegisterCredentials } from 'src/app/models/auth-models/userCredentials';
import { TokenObject } from 'src/app/modules/authentication/login/models/token-object';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrl}users`;
  }

  public register(userCredentials: UserRegisterCredentials): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<boolean>(this.url + `/register`, JSON.stringify(userCredentials), { headers: headers });
  }

  public registerAndLoginWithGoogle(googleRegisterValues: GoogleRegisterValues): Observable<TokenObject> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<TokenObject>(this.url + `/login/google`, JSON.stringify(googleRegisterValues), { headers: headers });
  }
}