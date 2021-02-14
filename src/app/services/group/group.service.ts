import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CreateGroup } from 'src/app/models/group-models/create-group';
import { GetGroup } from 'src/app/models/group-models/get-group';
import { LeaveGroup } from 'src/app/models/group-models/leave-group';
import { UpdateGroup } from 'src/app/models/group-models/update-group';
import { CreateMembers } from 'src/app/models/member-models/create-members';
import { GroupQueries } from './group-queries';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private apollo: Apollo) {
  }

  public getGroupData(groupId: string): Observable<ApolloQueryResult<GetGroup>>{
    return this.apollo.query<GetGroup>({
      query: GroupQueries.GetGroupDataQuery,
      variables: {
        groupId: groupId,
      }
    });
  }

  public createGroup(
    name: string, 
    description: string, 
    userIds : string[]): Observable<FetchResult<CreateGroup>>
  {
    return this.apollo.mutate({
      mutation: GroupQueries.CreateGroupMutation,
      variables: {
        name: name,
        description: description,
        userIds: userIds
      }
    });
  }

  public createGroupMembers(
    groupId: string, 
    userIds : string[]): Observable<FetchResult<CreateMembers>>
  {
    return this.apollo.mutate({
      mutation: GroupQueries.CreateGroupMembersMutation,
      variables: {
        groupId: groupId,
        userIds: userIds
      }
    });
  }

  public leaveGroup(memberId: string): Observable<FetchResult<LeaveGroup>>{
    return this.apollo.mutate({
      mutation: GroupQueries.LeaveGroupMutation,
      variables: {
        memberId: memberId
      }
    });
  }

  public getGroupMemberEmails(groupId: string): Observable<ApolloQueryResult<GetGroup>>{
    return this.apollo.query<GetGroup>({
      query: GroupQueries.GetGroupMembersQuery,
      variables: {
        groupId: groupId,
      }
    });
  }

  public updateGroup(
    id: string, 
    name: string | null, 
    description: string | null): Observable<FetchResult<UpdateGroup>>{
    return this.apollo.mutate({
      mutation: GroupQueries.UpdateGroupMutation,
      variables: {
        id: id,
        name: name,
        description: description
      }
    });
  }
}