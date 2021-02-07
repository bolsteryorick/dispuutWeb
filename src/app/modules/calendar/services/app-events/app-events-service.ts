import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetUserData } from 'src/app/modules/models/get-user';

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getAppEventsForUser(): Observable<GetUserData>{
    // make graphql service
    var token = localStorage.getItem("token");
    console.log(token);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
    var query = `
    query{
      getUser{
        memberships{
          group{
            name,
            id,
            appEvents{
              id,
              name,
              startTime,
              endTime
            }
          }
        }
      }
    }`;
    var request = {"query": query};
    return this.httpClient.post<GetUserData>(this.url, request, { headers: headers });
  }

}