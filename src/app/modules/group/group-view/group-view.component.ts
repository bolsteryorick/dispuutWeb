import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { GroupConstants } from 'src/app/constants/group-constants';
import { EventInfo } from '../../calendar/event-list/models/event-info';
import { EventInfoService } from '../../../services/appEvent/event-info.service';
import { Group } from '../../../models/app-models/group';
import { GetGroup } from '../../../models/group-models/get-group';
import { UserService } from 'src/app/services/authentication/user.service';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  private groupId!: string;
  private userId: string;
  public isAdminOfGroup!: boolean;
  public group!: Group;
  public dateEventInfoDict!: { [date: string] : EventInfo[]; };
  public showData: boolean = false;

  public readonly groupNameValidators: ValidatorFn[] = GroupConstants.groupNameValidators;
  public readonly groupDescriptionValidators: ValidatorFn[] = GroupConstants.groupDescriptionValidators;

  public readonly groupNameMessage: string = GroupConstants.groupNameMessage;
  public readonly groupDescriptionMessage: string = GroupConstants.groupDescriptionMessage;
  public readonly groupNameStyling = GroupConstants.groupNameStyling;
  groupName = "group name";

  constructor(
    private route: ActivatedRoute, 
    private _groupService: GroupService,
    private _eventInfoService: EventInfoService,
    private _router: Router,
    private _userService: UserService
    ) {
      this.userId = this._userService.userId();
      this.route.params.subscribe( params => this.groupId = params.id );
  }

  ngOnInit(): void {
    const request = this._groupService.getGroupData(this.groupId);
    request.subscribe((result: ApolloQueryResult<GetGroup>) => {
      this.group = result.data.getGroup;
      this.setDateEventInfoDict(this.group)
      this.showData = true;
      this.isAdminOfGroup = this.userisAdminOfGroup();
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private userisAdminOfGroup() : boolean{
    return this.group.members.some(m => m.userId == this.userId && m.isAdmin);
  }

  private setDateEventInfoDict(group: Group): void{
    let groups : Group[] = [group];
    this.dateEventInfoDict = this._eventInfoService.getDateEvents(groups);
  }

  createEvent(){
    this._router.navigate([`event/create/${this.groupId}`])
  }

  addMembers(){
    this._router.navigate([`group/addMembers/${this.groupId}`])
  }

  leaveGroup(){
    let memberId = this.group.members.find(m => m.userId == this.userId)!.id;
    console.log(memberId)
    this._groupService.leaveGroup(memberId).subscribe(() => {
      this._router.navigate([`calendar/list`])
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  saveGroupName(value: string){
    this.group.name = value;
    this._groupService.updateGroup(this.groupId, this.group.name, null).subscribe();
  }

  saveGroupDescription(value: string){
    this.group.description = value;
    this._groupService.updateGroup(this.groupId, null, this.group.description).subscribe();
  }

}