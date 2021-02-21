import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/models/app-models/attendee';
import { UserService } from 'src/app/services/authentication/user.service';
import { AttendeeWrapper } from '../attendee-list/models/attendee-wrapper';
import { IAttendeeUpdate } from '../attendee-update';

@Component({
  selector: 'app-attendee-list-item',
  templateUrl: './attendee-list-item.component.html',
  styleUrls: ['./attendee-list-item.component.scss']
})
export class AttendeeListItemComponent implements OnInit{

  @Input() wa!: AttendeeWrapper;
  @Input() editPossible: boolean = false;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() update: EventEmitter<IAttendeeUpdate> = new EventEmitter<IAttendeeUpdate>();
  private _userId!: string;

  constructor(
    userService: UserService,
    private _router: Router) {
    this._userId = userService.userId();
  }
  
  ngOnInit(): void {}

  getPaidText(): string{
    return this.wa.attendee.paid ? "paid" : "not paid";
  }

  showDeleteAttendee(){
    return this.editPossible && this.wa.attendee.user.id != this._userId;
  }

  showChangePaidStatus(){
    return this.editPossible;
  }

  deleteAttendee(attendeeId: string){
    this.delete.emit(attendeeId);
  }

  updateAttendee(attendeeId: string, paid: boolean){
    this.wa.paidButtonDisabled = true;
    let attendeeUpdate : IAttendeeUpdate = {
      attendeeId: attendeeId,
      paid: paid
    }
    this.update.emit(attendeeUpdate);
  }

  goToOtherProfile(){
    this._router.navigate([`/profile/profile/${this.wa.attendee.user.id}`]);
  }
}
