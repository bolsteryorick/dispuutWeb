import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { CreateGroupData } from '../../models/create-group';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public createGroup(name: string, description: string, userIds : string[]): Observable<CreateGroupData>{
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
    var userIdsJson = JSON.stringify(userIds);
    let query = `
    mutation{
      createGroup(name: "${name}", description: "${description}", userIds: ${userIdsJson}){
        id
      }
    }`
    var request = {"query": query};
    return this.httpClient.post<CreateGroupData>(this.url, request, { headers: headers });
  }
}