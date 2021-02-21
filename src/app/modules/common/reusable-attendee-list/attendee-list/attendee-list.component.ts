import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Attendee } from 'src/app/models/app-models/attendee';
import { GetAppEvent } from 'src/app/models/event-models/get-app-event';
import { AttendeeService } from 'src/app/services/attendee/attendee.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { IAttendeeUpdate } from '../attendee-update';
import { AttendeeWrapper } from './models/attendee-wrapper';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Input() appEventId!: string;
  @Input() editPossible: boolean = false;
  showData: boolean = false;
  wrappedAttendees: AttendeeWrapper[] = [];
  private _userId: string = "";
  isAdminOfGroup: boolean = false;
  isAttendingEvent: boolean = false;
  constructor(
    private _attendeeService: AttendeeService,
    userService: UserService) {
      this._userId = userService.userId();
     }

  ngOnInit(): void {
    const request = this._attendeeService.getAttendeesData(this.appEventId);
    request.subscribe((result: ApolloQueryResult<GetAppEvent>) => {
      this.wrappedAttendees = result.data.getAppEvent.attendees?.map(x => this.getWrappedAttendee(x) );
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
      let attendeeId = this.wrappedAttendees.find(m => m.attendee.user.id == this._userId)!.attendee.id;
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
    this.showData = false;
    this._attendeeService.deleteAttendee(attendeeId).subscribe(() => {
      this.ngOnInit()
    });
  }

  updatePaidAttendee(attendeeUpdate: IAttendeeUpdate){
    let attendeeId = attendeeUpdate.attendeeId;
    let paid = attendeeUpdate.paid;     
    this._attendeeService.updateAttendee(attendeeId, paid).subscribe(() => {
      let wa = this.wrappedAttendees.find(m => m.attendee.id == attendeeId)!;
      wa.paidButtonDisabled = false;
      wa.attendee.paid = paid;
    });
  }

  private getWrappedAttendee(attendee: Attendee): AttendeeWrapper{
    const wrappedAttendee : AttendeeWrapper = {
      attendee: attendee,
      paidButtonDisabled: false
    }
    return wrappedAttendee;
  }

  private userIsAttendingEvent() : boolean{
    if(this.wrappedAttendees == null){
      return false;
    }
    return this.wrappedAttendees.some(m => m.attendee.user.id == this._userId);
  }
}