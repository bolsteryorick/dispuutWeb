import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetGroupData } from '../../models/get-group';
import { GetUserData } from '../../models/get-user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getGroupInformation(groupId: string): Observable<GetGroupData>{
    // make graphql service
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
      
    let query = `
    query{
      getGroup(id: "${groupId}"){
        id,
        name,
        description,
        appEvents{
          id,
          name,
          description,
          startTime,
          endTime
        },
        members{
          isAdmin,
          user{
            userName
          }
        }
      }
    }`
    var request = {"query": query};
    return this.httpClient.post<GetGroupData>(this.url, request, { headers: headers });
  }
}