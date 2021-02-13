import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { Attendee } from 'src/app/modules/models/app-models/attendee';
import { IAttendeeUpdate } from '../attendee-update';

@Component({
  selector: 'app-attendee-list-item',
  templateUrl: './attendee-list-item.component.html',
  styleUrls: ['./attendee-list-item.component.scss']
})
export class AttendeeListItemComponent implements OnInit {

  @Input() attendee!: Attendee;
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
    return this.attendee.paid ? "paid" : "not paid";
  }

  showDeleteAttendee(){
    return this.editPossible && this.attendee.user.id != this._userId;
  }

  showChangePaidStatus(){
    return this.editPossible;
  }

  deleteAttendee(attendeeId: string){
    this.delete.emit(attendeeId);
  }

  updateAttendee(attendeeId: string, paid: boolean){
    let attendeeUpdate : IAttendeeUpdate = {
      attendeeId: attendeeId,
      paid: paid
    }
    this.attendee.paid = paid;
    this.update.emit(attendeeUpdate);
  }

  goToOtherProfile(){
    console.log(this.attendee);
    this._router.navigate([`/profile/profile/${this.attendee.user.id}`]);
  }
}
