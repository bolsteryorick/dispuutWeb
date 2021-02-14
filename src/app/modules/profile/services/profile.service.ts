import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GetOtherUser } from '../../../models/user-models/get-other-user';
import { GetUser } from '../../../models/user-models/get-user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apollo: Apollo) {
  }

  public getProfile(): Observable<ApolloQueryResult<GetUser>>{
    return this.apollo.query<GetUser>({
      query: GETPROFILEQUERY
    });
  }

  public getOtherProfile(userId: string): Observable<ApolloQueryResult<GetOtherUser>>{
    return this.apollo.query<GetOtherUser>({
      query: GETOTHERPROFILEQUERY,
      variables: {
        userId: userId,
      }
    });
  }
}

const GETPROFILEQUERY = gql`
  query{
    getUser{
        id,
        email,
        userName,
        contacts{
            emailAddress,
            contactUserId,
            user{
              id,
              userName,
              email
            }
        }
    }
  }`;

const GETOTHERPROFILEQUERY = gql`
  query GetOtherUserById($userId: String!) {
    getOtherUser(userId: $userId){
      email,
      userName,
      id
    }
  }`;