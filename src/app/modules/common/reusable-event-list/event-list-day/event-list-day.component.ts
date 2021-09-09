import { Component, Input, OnInit } from '@angular/core';
import { DateInfo } from '../../../calendar/event-list/models/date-info';

@Component({
  selector: 'app-event-list-day',
  templateUrl: './event-list-day.component.html',
  styleUrls: ['./event-list-day.component.scss']
})
export class EventListDayComponent implements OnInit {

  @Input() dateInfo!: DateInfo;
  public isFirstOfMonth!: boolean;
  public month!: string;
  public dayHasEvents!: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isFirstOfMonth = this.dateInfo.date.getDate() == 1;
    this.month = this.dateInfo.date.toLocaleString('default', { month: 'long' });
    this.dayHasEvents = this.dateInfo.eventInfos != null && this.dateInfo.eventInfos.length > 0;
  }

}
 