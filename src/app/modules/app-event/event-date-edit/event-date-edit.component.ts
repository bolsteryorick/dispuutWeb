import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppEventConstants } from 'src/app/constants/app-event-constants';
import { AppEventService } from 'src/app/services/appEvent/app-event.service';

@Component({
  selector: 'app-event-date-edit',
  templateUrl: './event-date-edit.component.html',
  styleUrls: ['./event-date-edit.component.scss']
})
export class EventDateEditComponent implements OnInit {

  @Input() startDateTime!: Date;
  @Input() endDateTime!: Date;
  @Input() appEventId!: string;
  @Input() editPossible: boolean = false;
  startDateString: string = "";
  startTimeString: string = "";
  endDateString: string = "";
  endTimeString: string = "";
  dateType = "date";
  timeType = "time";
  dateTimeValidators = AppEventConstants.dateAndTimeValidators;
  dateMessage: string = AppEventConstants.dateMessage;
  timeMessage: string = AppEventConstants.timeMessage;
  startDateControl!: FormControl;
  startTimeControl!: FormControl;
  endDateControl!: FormControl;
  endTimeControl!: FormControl;
  constructor(
    private _appEventService: AppEventService) { }
  

  ngOnInit(): void {
    this.startDateControl = new FormControl("2020-04-29", AppEventConstants.dateAndTimeValidators);
    this.startTimeControl = new FormControl(this.startDateTime, AppEventConstants.dateAndTimeValidators);
    this.endDateControl = new FormControl(this.endDateTime, AppEventConstants.dateAndTimeValidators);
    this.endTimeControl = new FormControl(this.endDateTime, AppEventConstants.dateAndTimeValidators);
    this.startDateString = this.startDateTime.toString().split('T')[0];
    this.startTimeString = this.GetTime(new Date(this.startDateTime));
    this.endDateString = this.endDateTime.toString().split('T')[0];
    this.endTimeString = this.GetTime(new Date(this.endDateTime));
  }

  public startDateTimeError(): boolean{
    return !(this.startDateControl.valid && this.startTimeControl.valid);
  }

  public endDateTimeError(): boolean{
    return !(this.endDateControl.valid && this.endTimeControl.valid);
  }

  private GetTime(date: Date) : string{
    return `${this.GetHours(date)}:${this.GetMinutes(date)}`;
  }

  private GetHours(date: Date): string{
    return ("0" + date.getHours()).slice(-2);
  }

  private GetMinutes(date: Date): string{
    return ("0" + date.getMinutes()).slice(-2);
  }

  saveStartDate(value: string){
    this.startDateTime = this.updateDateOnDateTime(value, this.startDateTime);
    this.updateStartDateTime();
  }

  saveStartTime(value: string){
    this.startDateTime = this.updateTimeOnDateTime(value, this.startDateTime);
    this.updateStartDateTime();
  }

  private updateStartDateTime(){
    this._appEventService.updateAppEvent({id: this.appEventId, startTime: this.startDateTime});
  }

  saveEndDate(value: string){
    this.endDateTime = this.updateDateOnDateTime(value, this.endDateTime);
    this.updateEndDateTime();
  }

  saveEndTime(value: string){
    this.endDateTime = this.updateTimeOnDateTime(value, this.endDateTime);
    this.updateEndDateTime();
  }

  private updateEndDateTime(){
    this._appEventService.updateAppEvent({id: this.appEventId, endTime: this.endDateTime});
  }

  private updateDateOnDateTime(newDateString: string, oldDateTime: Date): Date{
    let splitValue = newDateString.split("-");
    let year = splitValue[0];
    let month = splitValue[1];
    let day = splitValue[2];
    let updatedDateTime = new Date(oldDateTime);
    updatedDateTime.setFullYear(+year);
    updatedDateTime.setMonth(+month-1);
    updatedDateTime.setDate(+day);
    return updatedDateTime;
  }

  private updateTimeOnDateTime(newTimeString: string, oldDateTime: Date): Date{
    let splitValue = newTimeString.split(":");
    let hours = splitValue[0];
    let minutes = splitValue[1];
    let updatedDateTime = new Date(oldDateTime);
    updatedDateTime.setHours(+hours);
    updatedDateTime.setMinutes(+minutes);
    return updatedDateTime;
  }
}
