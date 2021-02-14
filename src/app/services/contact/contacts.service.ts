import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetUser } from '../../models/user-models/get-user';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url: string;
  constructor(
    private apollo: Apollo) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getUserContactsInformation(): Observable<ApolloQueryResult<GetUser>>{
    return this.apollo.query<GetUser>({
      query: GETCONTACTSFROMUSERQUERY
    });
  }

}

const GETCONTACTSFROMUSERQUERY = gql`
  query{
    getUser{
        id,
        contacts{
            emailAddress,
            contactUserId,
            user{
              userName
            }
        }
    }
  }`;