import { Component, Input, OnInit } from '@angular/core';
import { Attendee } from 'src/app/modules/models/app-models/attendee';
import { AttendeeService } from 'src/app/services/attendee.service';
import { IAttendeeUpdate } from '../attendee-update';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Input() attendees!: Attendee[];
  @Input() editPossible: boolean = false;
  constructor(
    private _attendeeService: AttendeeService) { }

  ngOnInit(): void {
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
}