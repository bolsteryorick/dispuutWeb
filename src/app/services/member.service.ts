import { Injectable } from '@angular/core';
import { DeleteMemberData } from '../modules/models/member-models/delete-member';
import { GraphqlService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private graphqlService: GraphqlService) { }

  public deleteMember(id: string){
    let query = `mutation{
      deleteMember(memberId: "${id}"){
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<DeleteMemberData>(query);
  }
}
