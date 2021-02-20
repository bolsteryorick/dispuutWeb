import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetUser } from '../../models/user-models/get-user';
import { GraphqlWrapper } from '../graphql-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url: string;
  constructor(
    private _graphqlWrapper: GraphqlWrapper) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getUserContactsInformation(): Observable<ApolloQueryResult<GetUser>>{
    return this._graphqlWrapper.query<GetUser>({
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