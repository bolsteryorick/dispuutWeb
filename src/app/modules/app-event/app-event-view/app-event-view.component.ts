import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { AppEventConstants } from 'src/app/constants/app-event-constants';
import { AppEvent } from 'src/app/models/app-models/app-event';
import { GetAppEvent } from 'src/app/models/event-models/get-app-event';
import { AppEventService } from 'src/app/services/appEvent/app-event.service';
import { UserService } from 'src/app/services/authentication/user.service';

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
    private _route: ActivatedRoute, 
    private _appEventService: AppEventService,
    private _userService: UserService
    ) {
    this._userId = this._userService.userId();
    this._route.params.subscribe( params => this.appEventId = params.id );
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
    console.log("app event view component request")
    const request = this._appEventService.getAppEventData(this.appEventId);
    request.subscribe((result: ApolloQueryResult<GetAppEvent>) => {
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
    this._appEventService.updateAppEvent({id: this.appEventId, name: value});
  }

  saveEventDescription(value: string){
    this.appEvent.description = value;
    this._appEventService.updateAppEvent({id: this.appEventId, description: value});
  }

  saveMaxAttendees(value: string){
    this.appEvent.maxAttendees = +value;
    this._appEventService.updateAppEvent({id: this.appEventId, maxAttendees: +value});
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
