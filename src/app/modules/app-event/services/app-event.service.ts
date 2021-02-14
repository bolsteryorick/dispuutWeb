import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CreateAppEvent } from '../../models/event-models/create-app-event';
import { GetAppEvent } from '../../models/event-models/get-app-event';
import { JoinEvent } from '../../models/event-models/join-event';
import { LeaveEvent } from '../../models/event-models/leave-event';
import { AppEventQueries } from './app-event-queries';



@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  constructor(private apollo: Apollo) {}
  
  public getAppEventData(eventId: string): Observable<ApolloQueryResult<GetAppEvent>>{
    return this.apollo.query<GetAppEvent>({
      query: AppEventQueries.GetAppEventDataQuery,
      variables: {
        eventId: eventId,
      }
    });
  }

  public createAppEvent(
    name: string, 
    description: string, 
    startTime: Date, 
    endTime: Date,
    maxAttendees: number | null,
    groupId: string): Observable<FetchResult<CreateAppEvent>>
  {
    return this.apollo.mutate({
      mutation: AppEventQueries.CreateAppEventMutation,
      variables: {
        name: name,
        description: description,
        startTime: startTime,
        endTime: endTime,
        maxAttendees: maxAttendees,
        groupId: groupId,
      }
    });
  }

  public joinEvent(eventId: string): Observable<FetchResult<JoinEvent>>{
    return this.apollo.mutate({
      mutation: AppEventQueries.joinEventMutation,
      variables:{
        eventId: eventId
      }
    });
  }

  public leaveEvent(attendeeId: string): Observable<FetchResult<LeaveEvent>>{
    return this.apollo.mutate({
      mutation: AppEventQueries.leaveEventMutation,
      variables:{
        attendeeId: attendeeId
      }
    });
  }

  public updateAppEvent(
    update: {id: string, 
    name?: string, 
    description?: string,
    maxAttendees?: number,
    startTime?: Date,
    endTime?: Date}){
      console.log(update)
      this.apollo.mutate({
        mutation: AppEventQueries.UpdateAppEventMutation,
        variables: {
          id: update.id,
          name: update.name,
          description: update.description,
          startTime: update.startTime,
          endTime: update.endTime,
          maxAttendees: update.maxAttendees,
        }
      })
      .subscribe();
    }
}