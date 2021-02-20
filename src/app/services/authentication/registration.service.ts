import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { UserRegisterCredentials } from 'src/app/models/auth-models/userCredentials';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrl}users/register`;
  }

  public register(userCredentials: UserRegisterCredentials): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<boolean>(this.url, JSON.stringify(userCredentials), { headers: headers });
  }
}