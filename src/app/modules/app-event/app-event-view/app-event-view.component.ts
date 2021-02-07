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
  public isAdminOfGroup!: boolean;

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
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  saveEventName(value: string){
    this.appEvent.name = value;
    this._appEventService.updateName(this.appEventId, value);
  }

  saveEventDescription(value: string){
    this.appEvent.description = value;
    this._appEventService.updateDescription(this.appEventId, value);
  }

  saveMaxAttendees(value: string){
    this.appEvent.maxAttendees = +value;
    this._appEventService.updateMaxAttendees(this.appEventId, value);
  }

  private userisAdminOfGroup() : boolean{
    let userId = this._userService.userId();
    return this.appEvent.group.members.some(m => m.userId == userId && m.isAdmin);
  }
}
