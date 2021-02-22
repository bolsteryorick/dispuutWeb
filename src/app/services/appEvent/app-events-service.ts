import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GetUser} from 'src/app/models/user-models/get-user';
import { GraphqlWrapper } from '../graphql-wrapper.service';

const USER_APP_EVENTS = gql`
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



@Injectable({
  providedIn: 'root'
})
export class AppEventsService {
  constructor(
    private _graphqlWrapper: GraphqlWrapper) {
  }

  public getAppEventsForUser(): Observable<ApolloQueryResult<GetUser>>{
    return this._graphqlWrapper.query<GetUser>({
      query: USER_APP_EVENTS
    });
  }
}