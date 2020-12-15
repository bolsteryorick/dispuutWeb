import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventInfo } from 'src/app/modules/calendar/event-list/models/event-info';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit { 

  @Input() eventInfo!: EventInfo;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  
  eventClicked(){
    this._router.navigate([`/event/view/${this.eventInfo.eventId}`])
  }

  groupClicked(){
    this._router.navigate([`/group/view/${this.eventInfo.groupId}`])
  }

}