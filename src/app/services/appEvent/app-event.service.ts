import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CreateAppEvent } from 'src/app/models/event-models/create-app-event';
import { GetAppEvent } from 'src/app/models/event-models/get-app-event';
import { GraphqlWrapper } from '../graphql-wrapper.service';
import { AppEventQueries } from './app-event-queries';



@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  constructor(private _graphqlWrapper: GraphqlWrapper) {}
  
  public getAppEventData(eventId: string): Observable<ApolloQueryResult<GetAppEvent>>{
    return this._graphqlWrapper.query<GetAppEvent>({
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
    return this._graphqlWrapper.mutate({
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

  public updateAppEvent(
    update: {id: string, 
    name?: string, 
    description?: string,
    maxAttendees?: number,
    startTime?: Date,
    endTime?: Date}){
      this._graphqlWrapper.mutate({
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