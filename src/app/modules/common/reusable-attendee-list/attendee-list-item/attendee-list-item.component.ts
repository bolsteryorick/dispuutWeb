import { Component, Input, OnInit } from '@angular/core';
import { Attendee } from 'src/app/modules/models/app-models/attendee';

@Component({
  selector: 'app-attendee-list-item',
  templateUrl: './attendee-list-item.component.html',
  styleUrls: ['./attendee-list-item.component.scss']
})
export class AttendeeListItemComponent implements OnInit {

  @Input() attendee!: Attendee;
  constructor() { 
  }
  
  ngOnInit(): void {
    console.log(this.attendee)
  }

}
