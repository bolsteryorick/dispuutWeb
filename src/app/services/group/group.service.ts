import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CreateGroup } from 'src/app/models/group-models/create-group';
import { GetGroup } from 'src/app/models/group-models/get-group';
import { LeaveGroup } from 'src/app/models/group-models/leave-group';
import { UpdateGroup } from 'src/app/models/group-models/update-group';
import { CreateMembers } from 'src/app/models/member-models/create-members';
import { GetUser } from 'src/app/models/user-models/get-user';
import { GraphqlWrapper } from '../graphql-wrapper.service';
import { GroupQueries } from './group-queries';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private _graphqlWrapper: GraphqlWrapper) {
  }

  public getGroupData(groupId: string): Observable<ApolloQueryResult<GetGroup>>{
    return this._graphqlWrapper.query<GetGroup>({
      query: GroupQueries.GetGroupDataQuery,
      variables: {
        groupId: groupId,
      }
    });
  }

  public getGroupName(groupId: string): Observable<ApolloQueryResult<GetGroup>>{
    return this._graphqlWrapper.query<GetGroup>({
      query: GroupQueries.GetGroupNameQuery,
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
    return this._graphqlWrapper.mutate({
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
    return this._graphqlWrapper.mutate({
      mutation: GroupQueries.CreateGroupMembersMutation,
      variables: {
        groupId: groupId,
        userIds: userIds
      }
    });
  }

  public leaveGroup(memberId: string): Observable<FetchResult<LeaveGroup>>{
    return this._graphqlWrapper.mutate({
      mutation: GroupQueries.LeaveGroupMutation,
      variables: {
        memberId: memberId
      }
    });
  }

  public getGroupMemberEmails(groupId: string): Observable<ApolloQueryResult<GetGroup>>{
    return this._graphqlWrapper.query<GetGroup>({
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
    return this._graphqlWrapper.mutate({
      mutation: GroupQueries.UpdateGroupMutation,
      variables: {
        id: id,
        name: name,
        description: description
      }
    });
  }

  public getGroupsForUser(): Observable<ApolloQueryResult<GetUser>>{
    return this._graphqlWrapper.query<GetUser>({
      query: GroupQueries.UserGroups
    });
  }
}