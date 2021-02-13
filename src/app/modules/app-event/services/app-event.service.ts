import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { CreateAppEventData } from '../../models/create-app-event';
import { GetAppEventData } from '../../models/get-app-event';
import { JoinEventData } from '../../models/join-event';
import { LeaveEventData } from '../../models/leave-event';
import { UpdateAppEventData } from '../../models/update-app-event';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  constructor(private graphqlService: GraphqlService) {}
  
  public getAppEventData(eventId: string): Observable<GetAppEventData>{
    let query = `
    query{
      getAppEvent(id: "${eventId}"){
        endTime,
        id,
        name,
        description,
        startTime,
        maxAttendees,
        group{
          members{
            isAdmin,
            userId,
            user{
              userName
            }
          }
        },
        attendees{
          user{
            userName,
            id
          },
          id,
          paid
        }
      }
    }`
    return this.graphqlService.sendGraphqlRequest<GetAppEventData>(query);
  }

  public createAppEvent(
    name: string, 
    description: string, 
    startTime: Date, 
    endTime: Date,
    maxAttendees: string,
    groupId: string): Observable<CreateAppEventData>
  {
    let maxAttendeesString = ``;
    if(maxAttendees != null && maxAttendees != ""){
        maxAttendeesString = `maxattendees: ${maxAttendees},`
    }
    console.log(startTime.toISOString())
    
    let query = `
    mutation{
        createAppEvent(
            name: "${name}", 
            description: "${description}", 
            startTime:"${startTime.toISOString()}", 
            endTime: "${endTime.toISOString()}",
            ${maxAttendeesString}
            groupId: "${groupId}"){
          id,
          name,
          description
        }
      }`;
    return this.graphqlService.sendGraphqlRequest<CreateAppEventData>(query);
  }

  public joinEvent(eventId: string): Observable<JoinEventData>{
    let query = `
    mutation{
      joinEvent(eventId: "${eventId}"){
        id
      }
    }`
    return this.graphqlService.sendGraphqlRequest<JoinEventData>(query);
  }

  public leaveEvent(attendeeId: string): Observable<LeaveEventData>{
    let query = `
    mutation{
      leaveEvent(attendeeId: "${attendeeId}"){
        id
      }
    }`
    return this.graphqlService.sendGraphqlRequest<LeaveEventData>(query);
  }

  public updateName(id: string, name: string){
    return this.updateAppEventStringProperty(id, name, 'name').subscribe(() => {}, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public updateDescription(id: string, description: string){
    this.updateAppEventStringProperty(id, description, 'description').subscribe(() => {}, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public updateMaxAttendees(id: string, maxAttendees: string){
    this.updateAppEventStringProperty(id, maxAttendees, 'maxAttendees').subscribe(() => {}, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public updateStartDateTime(id: string, startTime: Date){
    this.updateAppEventDateProperty(id, startTime, 'startTime').subscribe(() => {}, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public updateEndDateTime(id: string, endTime: Date){
    this.updateAppEventDateProperty(id, endTime, 'endTime').subscribe(() => {}, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private updateAppEventStringProperty(id: string, value: string, propertyName: string): Observable<UpdateAppEventData>{
    let query = this.makeQuery(id, this.getArg(value, propertyName));
    return this.graphqlService.sendGraphqlRequest<UpdateAppEventData>(query);
  }

  private updateAppEventDateProperty(id: string, value: Date, propertyName: string): Observable<UpdateAppEventData>{
    let query = this.makeQuery(id, this.getDateArg(value, propertyName));
    return this.graphqlService.sendGraphqlRequest<UpdateAppEventData>(query);
  }

  private makeQuery(id: string, arg: string): string{
    return `
    mutation{
      updateAppEvent(
        id: "${id}"
        ${arg}
      ){
        id
      }
    }`
  }

  private getArg(value: string | null, name: string){
    return `, ${name}: "${value}"`;
  }

  private getDateArg(value: Date | null, name: string){
    return value != null ? `, ${name}: "${value.toISOString()}"` : "";
  }
}