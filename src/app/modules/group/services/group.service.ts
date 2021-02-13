import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { CreateGroupData } from '../../models/create-group';
import { GetGroupData } from '../../models/get-group';
import { LeaveGroupData } from '../../models/leave-group';
import { CreateMembers, CreateMembersData } from '../../models/members/create-members';
import { UpdateGroupData } from '../../models/update-group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private graphqlService: GraphqlService) {
  }

  public createGroup(name: string, description: string, userIds : string[]): Observable<CreateGroupData>{
    var userIdsJson = JSON.stringify(userIds);
    let query = `
    mutation{
      createGroup(name: "${name}", description: "${description}", userIds: ${userIdsJson}){
        id
      }
    }`
    return this.graphqlService.sendGraphqlRequest<CreateGroupData>(query);
  }

  public createGroupMembers(groupId: string, userIds : string[]): Observable<CreateMembersData>{
    var userIdsJson = JSON.stringify(userIds);
    let query = `
    mutation{
      createMembers(userIds: ${userIdsJson}, groupId: "${groupId}"){
        groupId
      }
    }`
    return this.graphqlService.sendGraphqlRequest<CreateMembersData>(query);
  }

  public leaveGroup(memberId: string): Observable<LeaveGroupData>{
    let query = `
    mutation{
      leaveGroup(memberId: "${memberId}"){
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<LeaveGroupData>(query);
  }

  public getGroupInformation(groupId: string): Observable<GetGroupData>{
    let query = `
    query{
      getGroup(id: "${groupId}"){
        id,
        name,
        description,
        appEvents{
          id,
          name,
          description,
          startTime,
          endTime
        },
        members{
          id,
          isAdmin,
          userId,
          user{
            userName
          }
        }
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<GetGroupData>(query);
  }

  public getGroupMemberEmails(groupId: string): Observable<GetGroupData>{
    let query = `
    query{
      getGroup(id: "${groupId}"){
        members{
          user{
            email
          }
        }
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<GetGroupData>(query);
  }

  public updateGroup(id: string, name: string | null, description: string | null): Observable<UpdateGroupData>{
    let descripArg = this.getArg(description, 'description');
    let nameArg = this.getArg(name, 'name');
    let query = `
    mutation{
      updateGroup(
        id: "${id}"
        ${descripArg}
        ${nameArg}
      ){
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<UpdateGroupData>(query);
  }

  private getArg(value: string | null, name: string){
    return value != null ? `, ${name}: "${value}"` : "";
  }
}