import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppEventConstants } from 'src/app/constants/app-event-constants';
import { UserService } from '../../authentication/services/user.service';
import { AppEvent } from '../../models/app-models/app-event';
import { GetAppEventData } from '../../models/get-app-event';
import { AppEventService } from '../services/app-event.service';

@Component({
  selector: 'app-app-event-view',
  templateUrl: './app-event-view.component.html',
  styleUrls: ['./app-event-view.component.scss']
})
export class AppEventViewComponent implements OnInit {
  public appEventId!: string;
  public appEvent!: AppEvent;
  public showData: boolean = false;
  public isAdminOfGroup: boolean = false;
  public isAttendingEvent: boolean = false;
  private _userId!: string;

  public readonly eventNameValidators: ValidatorFn[] = AppEventConstants.appEventNameValidators;
  public readonly eventDescriptionValidators: ValidatorFn[] = AppEventConstants.appEventDescriptionValidators;
  public readonly dateAndTimeValidators: ValidatorFn[] = AppEventConstants.dateAndTimeValidators;
  public readonly maxAttendeesValidators: ValidatorFn[] = AppEventConstants.maxAttendeesValidators

  public readonly eventNameMessage: string = AppEventConstants.appEventNameMessage;
  public readonly eventDescriptionMessage: string = AppEventConstants.appEventDescriptionMessage;
  public readonly dateTimeMessage: string = AppEventConstants.dateTimeMessage;
  public readonly maxAttendeesMessage: string = AppEventConstants.maxAttendeesMessage;
  public readonly appEventNameStyling = AppEventConstants.appEventNameStyling;

  maxAttendeesType = "number";

  constructor(
    private route: ActivatedRoute, 
    private _appEventService: AppEventService,
    private _userService: UserService
    ) {
    this._userId = this._userService.userId();
    this.route.params.subscribe( params => this.appEventId = params.id );
  }

  public showMaxAttendees(): boolean{
    return this.appEvent.maxAttendees != null;
  }

  public getMaxAttendees(): string{
      if(this.appEvent.maxAttendees != null){
        return this.appEvent.maxAttendees.toString();
      }
      return "No max";
  }

  ngOnInit(): void {
    const request = this._appEventService.getAppEventData(this.appEventId);
    request.subscribe((result: GetAppEventData) => {
      this.appEvent = result.data.getAppEvent;
      this.showData = true;
      this.isAdminOfGroup = this.userisAdminOfGroup();
      this.isAttendingEvent = this.userisAttendingEvent();
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  saveEventName(value: string){
    this.appEvent.name = value;
    this._appEventService.updateName(this.appEventId, value)
  }

  saveEventDescription(value: string){
    this.appEvent.description = value;
    this._appEventService.updateDescription(this.appEventId, value);
  }

  saveMaxAttendees(value: string){
    this.appEvent.maxAttendees = +value;
    this._appEventService.updateMaxAttendees(this.appEventId, value);
  }

  joinLeaveButtonText(): string{
    if(this.isAttendingEvent){
      return "Leave event";
    }
    return "Join event"
  }

  joinLeaveEvent(): void{
    if(this.isAttendingEvent){
      let attendeeId = this.appEvent.attendees.find(m => m.user.id == this._userId)!.id;
      this._appEventService.leaveEvent(attendeeId).subscribe(() => {
        this.ngOnInit()
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
    else{
      this._appEventService.joinEvent(this.appEventId).subscribe(() => {
        this.ngOnInit()
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }    
  }

  private userisAdminOfGroup() : boolean{
    return this.appEvent.group.members.some(m => m.userId == this._userId && m.isAdmin);
  }

  private userisAttendingEvent() : boolean{
    if(this.appEvent.attendees == null){
      return false;
    }
    return this.appEvent.attendees.some(m => m.user.id == this._userId);
  }
}
