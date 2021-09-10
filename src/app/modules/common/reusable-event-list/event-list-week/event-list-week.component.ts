import { Component, Input, OnInit } from '@angular/core';
import { DateInfo } from 'src/app/modules/calendar/event-list/models/date-info';
import { WeekInfo } from 'src/app/modules/calendar/event-list/models/week-info';

@Component({
  selector: 'app-event-list-week',
  templateUrl: './event-list-week.component.html',
  styleUrls: ['./event-list-week.component.scss']
})
export class EventListWeekComponent implements OnInit {
  @Input() weekInfo!: WeekInfo;
  public dateInfos!: DateInfo[];
  public startWeekDateString!: string;
  public endWeekDateString!: string;
  constructor() { }
  private dateOptions = {month: 'short', day: 'numeric'} as const;

  ngOnInit(): void {
    this.dateInfos = this.weekInfo.dateInfos;
    this.startWeekDateString = this.weekInfo.startDate.toLocaleDateString("en-US", this.dateOptions )
    this.endWeekDateString = this.weekInfo.endDate.toLocaleDateString("en-US", this.dateOptions )
  }

}
