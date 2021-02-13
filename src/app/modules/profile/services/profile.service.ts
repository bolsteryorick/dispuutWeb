import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { GetOtherUserData } from '../../models/get-other-user';
import { GetUserData } from '../../models/get-user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private graphqlService: GraphqlService) {
  }

  public getProfile(): Observable<GetUserData>{
    let query = `
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
    return this.graphqlService.sendGraphqlRequest<GetUserData>(query);
  }

  public getOtherProfile(userId: string): Observable<GetOtherUserData>{
    let query = `
    query{
      getOtherUser(userId: "${userId}"){
        email,
        userName,
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<GetOtherUserData>(query);
  }
}
