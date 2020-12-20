import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInfo } from '../../calendar/event-list/models/event-info';
import { EventInfoService } from '../../common/reusable-event-list/services/event-info.service';
import { Group } from '../../models/app-models/group';
import { GetGroupData } from '../../models/get-group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  private groupId!: string;
  public group!: Group;
  public dateEventInfoDict!: { [date: string] : EventInfo[]; };
  public showData: boolean = false;
  constructor(
    private route: ActivatedRoute, 
    private _groupService: GroupService,
    private _eventInfoService: EventInfoService
    ) {
    this.route.params.subscribe( params => this.groupId = params.id );
  }

  ngOnInit(): void {
    console.log("view group")
    const request = this._groupService.getGroupInformation(this.groupId);
    request.subscribe((result: GetGroupData) => {
      this.group = result.data.getGroup;
      this.setDateEventInfoDict(this.group)
      this.showData = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private setDateEventInfoDict(group: Group): void{
    let groups : Group[] = [group];
    this.dateEventInfoDict = this._eventInfoService.getDateEvents(groups);
  }

  createEvent(){
      
  }

}