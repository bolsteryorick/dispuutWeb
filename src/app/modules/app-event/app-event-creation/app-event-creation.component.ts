import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchResult } from '@apollo/client/core';
import { AppEventConstants } from 'src/app/constants/app-event-constants';
import { CreateAppEvent} from '../../models/event-models/create-app-event';
import { AppEventService } from '../services/app-event.service';

@Component({
  selector: 'app-app-event-creation',
  templateUrl: './app-event-creation.component.html',
  styleUrls: ['./app-event-creation.component.scss']
})
export class AppEventCreationComponent implements OnInit {

  public groupId!: string;

  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _appEventService: AppEventService,
    private _router: Router
    ) {
    this.route.params.subscribe( params => this.groupId = params.groupId );
  }
  
  public readonly eventNameValidators: ValidatorFn[] = AppEventConstants.appEventNameValidators;
  public readonly eventDescriptionValidators: ValidatorFn[] = AppEventConstants.appEventDescriptionValidators;
  public readonly dateAndTimeValidators: ValidatorFn[] = AppEventConstants.dateAndTimeValidators;
  public readonly maxAttendeesValidators: ValidatorFn[] = AppEventConstants.maxAttendeesValidators

  public eventNameMessage: string = AppEventConstants.appEventNameMessage;
  public eventDescriptionMessage: string = AppEventConstants.appEventDescriptionMessage;
  public dateTimeMessage: string = AppEventConstants.dateTimeMessage;
  public maxAttendeesMessage: string = AppEventConstants.maxAttendeesMessage;
  public eventForm!: FormGroup;


  ngOnInit() {
    // get user contacts

    this.eventForm = this._formBuilder.group({
      eventNameInput: new FormControl({ value: '', disabled: false }),
      eventDescriptionInput: new FormControl({ value: '', disabled: false }),
      startDate: new FormControl({ value: '', disabled: false }),
      startTime: new FormControl({ value: '', disabled: false }),
      endDate: new FormControl({ value: '', disabled: false }),
      endTime: new FormControl({ value: '', disabled: false }),
      maxAttendees: new FormControl({ value: '', disabled: false })
    });

    // todo auto set end date same as start date, auto set end time 1 hour after start date

    this.eventForm?.controls?.eventNameInput?.setValidators(this.eventNameValidators);
    this.eventForm?.controls?.eventDescriptionInput?.setValidators(this.eventDescriptionValidators);
    this.eventForm?.controls?.startDate?.setValidators(this.dateAndTimeValidators);
    this.eventForm?.controls?.startTime?.setValidators(this.dateAndTimeValidators);
    this.eventForm?.controls?.endDate?.setValidators(this.dateAndTimeValidators);
    this.eventForm?.controls?.endTime?.setValidators(this.dateAndTimeValidators);
    this.eventForm?.controls?.maxAttendees?.setValidators(this.maxAttendeesValidators);
  }

  public buttonDisabled() {
    return !this.eventForm.controls.eventNameInput.valid || 
    !this.eventForm.controls.eventDescriptionInput.valid || 
    !this.eventForm.controls.startDate.valid ||
    !this.eventForm.controls.startTime.valid ||
    !this.eventForm.controls.endDate.valid ||
    !this.eventForm.controls.endTime.valid ||
    !this.eventForm.controls.maxAttendees.valid;
  }

  public createEvent(){
    const formVal = this.eventForm.getRawValue();
    let name = formVal.eventNameInput.toString();
    let description = formVal.eventDescriptionInput.toString();
    let startDate = new Date(`${formVal.startDate}T${formVal.startTime}`);
    let endDate = new Date(`${formVal.endDate}T${formVal.endTime}`);
    let maxAttendees = +formVal.maxAttendees;
    const requestApollo = this._appEventService.createAppEvent(
      name,
      description,
      startDate,
      endDate,
      maxAttendees == 0 ? null : maxAttendees,
      this.groupId
    );
    requestApollo.subscribe((result: FetchResult<CreateAppEvent>) => {
      let eventId = result.data?.createAppEvent.id;
      this._router.navigate([`/event/view/${eventId}`])
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  public nameError(): boolean{
    return !this.eventForm.controls.eventNameInput.valid && this.eventForm.controls.eventNameInput.touched;
  }

  public descriptionError(): boolean{
    return !this.eventForm.controls.eventDescriptionInput.valid && this.eventForm.controls.eventDescriptionInput.touched;
  }

  public startDateTimeError(): boolean{
    return !this.eventForm.controls.startDate.valid && this.eventForm.controls.startDate.touched 
            && !this.eventForm.controls.startTime.valid && this.eventForm.controls.startTime.touched;
  }

  public endDateTimeError(): boolean{
    return !this.eventForm.controls.endDate.valid && this.eventForm.controls.endDate.touched
            && !this.eventForm.controls.endTime.valid && this.eventForm.controls.endTime.touched;
  }

  public maxAttendeesError(): boolean{
    return !this.eventForm.controls.maxAttendees.valid && this.eventForm.controls.maxAttendees.touched;
  }
}