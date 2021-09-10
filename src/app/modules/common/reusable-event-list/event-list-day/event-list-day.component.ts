import { Component, Input, OnInit } from '@angular/core';
import { DateInfo } from '../../../calendar/event-list/models/date-info';

@Component({
  selector: 'app-event-list-day',
  templateUrl: './event-list-day.component.html',
  styleUrls: ['./event-list-day.component.scss']
})
export class EventListDayComponent implements OnInit {

  @Input() dateInfo!: DateInfo;
  public dayHasEvents!: boolean;
  public isFirstOfMonth!: boolean;
  public month!: string;
  public isFirstOfYear!: boolean;
  public year!: string;
  public weekDayShort!: string;
  public dayOfMonth!: string;
  constructor() { }

  ngOnInit(): void {
    this.isFirstOfMonth = this.dateInfo.date.getDate() == 1;
    this.month = this.dateInfo.date.toLocaleString('default', { month: 'long' });
    this.dayHasEvents = this.dateInfo.eventInfos != null && this.dateInfo.eventInfos.length > 0;
    this.isFirstOfYear = this.dateInfo.date.getMonth() == 0 && this.isFirstOfMonth;
    this.year = this.dateInfo.date.getFullYear().toString();
    this.weekDayShort = this.dateInfo.date.toLocaleString('default', {weekday: "short"});
    this.dayOfMonth = this.dateInfo.date.getDate().toString();
  }

}
 