import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private apollo: Apollo) { }

  public deleteMember(memberId: string){
    return this.apollo.mutate({
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