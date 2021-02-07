import { Injectable } from '@angular/core';
import { DeleteAttendeeData } from '../modules/models/attendees/delete-attendee';
import { GraphqlService } from './graphql.service';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(private graphqlService: GraphqlService) { }

  public deleteAttendee(id: string){
    let query = `mutation{
      deleteAttendee(id: "${id}"){
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<DeleteAttendeeData>(query);
  }

  public updateAttendee(id: string, paid: boolean){
    let query = `mutation{
      updateAttendee(id: "${id}", paid: ${paid}){
        id
      }
    }`;
    return this.graphqlService.sendGraphqlRequest<DeleteAttendeeData>(query);
  }
}
