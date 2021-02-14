import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { EventInfoService } from '../../../services/appEvent/event-info.service';
import { GetUser } from '../../../models/user-models/get-user';
import { AppEventsService } from '../../../services/appEvent/app-events-service';
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
    request.subscribe((result: ApolloQueryResult<GetUser>) => {
      this.setDateEventInfoDict(result.data);
      this.showList = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
  
  private setDateEventInfoDict(userData: GetUser): void{
    let groups = userData.getUser.memberships.map(event => event.group);
    this.dateEventInfoDict = this._eventInfoService.getDateEvents(groups);
  }
}