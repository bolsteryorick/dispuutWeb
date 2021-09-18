import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
  @Input() viewPortStyling!: {};
  @Output() addEvent: EventEmitter<string> = new EventEmitter<string>();
  faPlus = faPlus;
  public weekInfosData!: IDatasource;
  constructor(
    private _eventInfoService: EventInfoService
  ) { 
    
  }

  ngOnInit(): void {
    this.weekInfosData = this._eventInfoService.getDataSource(this.dateEventInfoDict);
  }

  addEventClicked(){
    this.addEvent.emit();
  }

} 
