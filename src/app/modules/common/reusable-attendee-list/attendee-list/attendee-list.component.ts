import { Component, Input, OnInit } from '@angular/core';
import { Attendee } from 'src/app/modules/models/app-models/attendee';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Input() attendees!: Attendee[];
  constructor() { }

  ngOnInit(): void {
  }

}
