import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult, gql } from '@apollo/client/core';
import { GetAppEvent } from '../../models/event-models/get-app-event';
import { Observable } from 'rxjs';
import { JoinEvent } from '../../models/event-models/join-event';
import { AttendeeQueries } from './attendee-queries';
import { LeaveEvent } from '../../models/event-models/leave-event';
import { GraphqlWrapper } from '../graphql-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(
    private _graphqlWrapper: GraphqlWrapper) { }

  public getAttendeesData(eventId: string): Observable<ApolloQueryResult<GetAppEvent>>{
    return this._graphqlWrapper.query<GetAppEvent>({
      query: AttendeeQueries.AttendeesByAppEventId,
      variables: {
        eventId: eventId,
      }
    })
  }

  public deleteAttendee(id: string){
    return this._graphqlWrapper.mutate({
      mutation: AttendeeQueries.DeleteAttendeeMutation,
      variables: {
        id: id
      }
    });
  }

  public updateAttendee(id: string, paid: boolean){
    return this._graphqlWrapper.mutate({
      mutation: AttendeeQueries.UpdateAttendeeMutation,
      variables: {
        id: id,
        paid: paid
      }
    });
  }

  public joinEvent(eventId: string): Observable<FetchResult<JoinEvent>>{
    return this._graphqlWrapper.mutate({
      mutation: AttendeeQueries.joinEventMutation,
      variables:{
        eventId: eventId
      }
    });
  }

  public leaveEvent(attendeeId: string): Observable<FetchResult<LeaveEvent>>{
    return this._graphqlWrapper.mutate({
      mutation: AttendeeQueries.leaveEventMutation,
      variables:{
        attendeeId: attendeeId
      }
    });
  }
}