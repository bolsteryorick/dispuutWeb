import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { EventInfoService } from '../../../services/appEvent/event-info.service';
import { GetUser } from '../../../models/user-models/get-user';
import { AppEventsService } from '../../../services/appEvent/app-events-service';
import { EventInfo } from './models/event-info';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy{
  public dateEventInfoDict!: { [date: string] : EventInfo[]; };
  public showList: boolean = false;
  private subscription!: Subscription;
  constructor(
    private _appEventsService: AppEventsService,
    private _eventInfoService: EventInfoService
    ) { 
    }
    
  ngOnInit(): void {
    const request = this._appEventsService.getAppEventsForUser();
    this.subscription = request.subscribe((result: ApolloQueryResult<GetUser>) => {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}