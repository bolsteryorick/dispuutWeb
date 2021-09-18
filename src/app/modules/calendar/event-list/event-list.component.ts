import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { EventInfoService } from '../../../services/appEvent/event-info.service';
import { GetUser } from '../../../models/user-models/get-user';
import { AppEventsService } from '../../../services/appEvent/app-events-service';
import { EventInfo } from './models/event-info';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/app-models/group';
import { faPlusSquare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { GroupService } from 'src/app/services/group/group.service';
import { Router } from '@angular/router';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy{
  groupPickModalActive: boolean = false;
  faUsers = faUsers;
  faPlusSquare = faPlusSquare;
  groups: Group[] = [];
  dateEventInfoDict!: { [date: string] : EventInfo[]; };
  showList: boolean = false;
  viewPortStyling = {'height': '80vh', 'overflow-y': 'auto', 'overflow-x': 'hidden', 'max-height': '1500px'};
  private subscription!: Subscription;
  


  constructor(
    private _appEventsService: AppEventsService,
    private _eventInfoService: EventInfoService,
    private _router : Router,
    private _groupService: GroupService,
    private _titleService: ToolbarAdditionService
    ) { 
    }
    
  ngOnInit(): void {
    this._titleService.changeTitleMessage("Calendar List");
    const appEventsRequest = this._appEventsService.getAppEventsForUser();
    this.subscription = appEventsRequest.subscribe((result: ApolloQueryResult<GetUser>) => {
      this.setDateEventInfoDict(result.data);
      this.showList = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

    let groupsRequest = this._groupService.getGroupsForUser();
    groupsRequest.subscribe((result: ApolloQueryResult<GetUser>) =>{
      let adminMemberships = result.data.getUser.memberships.filter(x => x.isAdmin);
      this.groups = adminMemberships.map(x => x.group);      
      this.groups.sort((a,b) => a.name.localeCompare(b.name));
    },
    (error)=>{
      console.log(error);
    })
  }
  
  private setDateEventInfoDict(userData: GetUser): void{
    let groups = userData.getUser.memberships.map(event => event.group);
    let attendences = userData.getUser.attendences;
    this.dateEventInfoDict = this._eventInfoService.getDateEvents(groups, attendences);
  }

  closeModal(){
    this.groupPickModalActive = false;
  }
  
  openModal(){
    this.groupPickModalActive = true;
  }
  
  createEventForGroup(groupId: string){
    this._router.navigate([`event/create/${groupId}`])
  }

  createGroup(){
    this._router.navigate(["/group/create"])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}