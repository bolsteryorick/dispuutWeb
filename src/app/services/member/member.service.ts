import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { GraphqlWrapper } from '../graphql-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _graphqlWrapper: GraphqlWrapper) { }

  public deleteMember(memberId: string){
    return this._graphqlWrapper.mutate({
      mutation: DELETEMEMBERMUTATION,
      variables: {
        memberId: memberId
      }
    });
  }
}

const DELETEMEMBERMUTATION = gql`
  mutation DeleteMember(
      $memberId: ID!
      ) {
        deleteMember(memberId: $memberId){
          id
        }
  }`;