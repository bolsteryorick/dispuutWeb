import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GetUser} from 'src/app/modules/models/get-user';

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
}
`;

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {
  constructor(
    private apollo: Apollo) {
  }

  public getAppEventsForUser(): Observable<ApolloQueryResult<GetUser>>{
    return this.apollo.query<GetUser>({
      query: USER_APP_EVENTS
    });
  }
}