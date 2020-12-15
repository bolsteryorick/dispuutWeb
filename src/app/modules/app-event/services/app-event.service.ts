import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetAppEventData } from '../../models/get-app-event';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }
  
  public getAppEventData(eventId: string): Observable<GetAppEventData>{
    // make graphql service
    var token = localStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `bearer ${token}`);
    let query = `query{getAppEvent(id: "${eventId}"){endTime,id,name,description,startTime,maxAttendees,group{members{isAdmin,user{userName}}},attendees{user{userName},paid}}}`
    var request = {"query": query};
    return this.httpClient.post<GetAppEventData>(this.url, request, { headers: headers });
  }
}