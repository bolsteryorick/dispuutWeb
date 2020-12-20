import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { CreateMembersData } from '../../models/create-members';

@Injectable({
  providedIn: 'root'
})
export class CreateMembersService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public createMembers(userIds: [string], groupId: string): Observable<CreateMembersData>{
    // make graphql service
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
      
    let query = `
    mutation{
        createMembers(userIds: ["", ""], groupId: ""){
          groupId
        }
      }`
    var request = {"query": query};
    return this.httpClient.post<CreateMembersData>(this.url, request, { headers: headers });
  }
}