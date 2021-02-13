import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetUserData } from '../../models/get-user';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getUserContactsInformation(): Observable<GetUserData>{
    // make graphql service
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
      
    let query = `
    query{
      getUser{
          id,
          contacts{
              emailAddress,
              contactUserId,
              user{
                userName
              }
          }
      }
    }`;
    var request = {"query": query};
    return this.httpClient.post<GetUserData>(this.url, request, { headers: headers });
  }
}