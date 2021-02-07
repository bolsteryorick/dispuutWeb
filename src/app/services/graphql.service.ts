import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../constants/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public sendGraphqlRequest<T>(query: string): Observable<T>{
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
          
    var request = {"query": query};
    return this.httpClient.post<T>(this.url, request, { headers: headers });
  }
}
