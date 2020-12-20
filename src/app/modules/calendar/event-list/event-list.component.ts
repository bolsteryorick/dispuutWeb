import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventInfoService } from '../../common/reusable-event-list/services/event-info.service';
import { GetUserData } from '../../models/get-user';
import { AppEventsService } from '../services/app-events/app-events-service';
import { EventInfo } from './models/event-info';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  public dateEventInfoDict!: { [date: string] : EventInfo[]; };
  public showList: boolean = false;
  constructor(
    private _appEventsService: AppEventsService,
    private _eventInfoService: EventInfoService
    ) { 
    }
    
  ngOnInit(): void {
    const request = this._appEventsService.getAppEventsForUser();
    request.subscribe((result: GetUserData) => {
      this.setDateEventInfoDict(result);
      this.showList = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
  
  private setDateEventInfoDict(userData: GetUserData): void{
    let groups = userData.data.getUser.memberships.map(event => event.group);
    this.dateEventInfoDict = this._eventInfoService.getDateEvents(groups);
  }
}