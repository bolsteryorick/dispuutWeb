import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Attendee } from 'src/app/models/app-models/attendee';
import { GetAppEvent } from 'src/app/models/event-models/get-app-event';
import { AttendeeService } from 'src/app/services/attendee/attendee.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { IAttendeeUpdate } from '../attendee-update';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Input() appEventId!: string;
  @Input() editPossible: boolean = false;
  showData: boolean = false;
  attendees: Attendee[] = [];
  private _userId: string = "";
  isAdminOfGroup: boolean = false;
  isAttendingEvent: boolean = false;
  constructor(
    private _attendeeService: AttendeeService,
    userService: UserService) {
      this._userId = userService.userId();
     }

  ngOnInit(): void {
    console.log("attendee list component request")
    const request = this._attendeeService.getAttendeesData(this.appEventId);
    request.subscribe((result: ApolloQueryResult<GetAppEvent>) => {
      this.attendees = result.data.getAppEvent.attendees;
      this.isAttendingEvent = this.userIsAttendingEvent();
      this.showData = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  joinLeaveButtonText(): string{
    if(this.isAttendingEvent){
      return "Leave event";
    }
    return "Join event"
  }

  joinLeaveEvent(): void{
    this.showData = false;
    if(this.isAttendingEvent){
      let attendeeId = this.attendees.find(m => m.user.id == this._userId)!.id;
      this._attendeeService.leaveEvent(attendeeId).subscribe(() => {
        this.ngOnInit()
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
    else{
      this._attendeeService.joinEvent(this.appEventId).subscribe(() => {
        this.ngOnInit()
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }    
  }

  deleteAttendee(attendeeId: string){
    this.attendees = this.attendees.filter(x => x.id != attendeeId);
    this._attendeeService.deleteAttendee(attendeeId).subscribe();
  }

  updatePaidAttendee(attendeeUpdate: IAttendeeUpdate){
    let attendeeId = attendeeUpdate.attendeeId;
    let paid = attendeeUpdate.paid;     
    this._attendeeService.updateAttendee(attendeeId, paid).subscribe();
  }

  private userIsAttendingEvent() : boolean{
    if(this.attendees == null){
      return false;
    }
    return this.attendees.some(m => m.user.id == this._userId);
  }
}