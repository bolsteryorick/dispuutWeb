import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventInfo } from 'src/app/modules/calendar/event-list/models/event-info';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit { 

  @Input() eventInfo!: EventInfo;
  public startTime!: string;
  public endTime!: string;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    let twoDigitHourStart = this.eventInfo.startDateTime.toLocaleString('default', {hour: '2-digit'});
    let twoDigitMinuteStart = this.eventInfo.startDateTime.toLocaleString('default', {minute: '2-digit'});
    this.startTime = `${twoDigitHourStart}:${twoDigitMinuteStart}`;

    let twoDigitHourEnd = this.eventInfo.endDateTime.toLocaleString('default', {hour: '2-digit'});
    let twoDigitMinuteEnd = this.eventInfo.endDateTime.toLocaleString('default', {minute: '2-digit'});
    this.endTime = `${twoDigitHourEnd}:${twoDigitMinuteEnd}`; 
  }
  
  eventClicked(){
    this._router.navigate([`/event/view/${this.eventInfo.eventId}`])
  }

  groupClicked(){
    this._router.navigate([`/group/view/${this.eventInfo.groupId}`])
  }
}