import { Component, Input, OnInit } from '@angular/core';
import { DateInfo } from '../../../calendar/event-list/models/date-info';

@Component({
  selector: 'app-event-list-day',
  templateUrl: './event-list-day.component.html',
  styleUrls: ['./event-list-day.component.scss']
})
export class EventListDayComponent implements OnInit {

  @Input() dateInfo!: DateInfo;
  constructor() { }

  ngOnInit(): void {
  }

}
 