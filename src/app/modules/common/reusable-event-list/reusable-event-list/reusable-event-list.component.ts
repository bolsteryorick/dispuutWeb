import { Component, Input, OnInit } from '@angular/core';
import { IDatasource } from 'ngx-ui-scroll';
import { EventInfo } from 'src/app/modules/calendar/event-list/models/event-info';
import { EventInfoService } from '../../../../services/appEvent/event-info.service';

@Component({
  selector: 'app-reusable-event-list',
  templateUrl: './reusable-event-list.component.html',
  styleUrls: ['./reusable-event-list.component.scss']
})
export class ReusableEventListComponent implements OnInit {

  @Input() dateEventInfoDict!: { [date: string] : EventInfo[]; };
  public weekInfosData!: IDatasource;
  constructor(
    private _eventInfoService: EventInfoService
  ) { 
    
  }

  ngOnInit(): void {
    this.weekInfosData = this._eventInfoService.getDataSource(this.dateEventInfoDict);
  }

} 
