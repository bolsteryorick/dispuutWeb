import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Group } from 'src/app/models/app-models/group';
import { GetGroup } from 'src/app/models/group-models/get-group';
import { UserService } from 'src/app/services/authentication/user.service';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-information',
  templateUrl: './group-information.component.html',
  styleUrls: ['./group-information.component.scss']
})
export class GroupInformationComponent implements OnInit {
  private userId: string;
  groupId!: string;
  group!: Group;
  showData: boolean = false;
  isAdminOfGroup: boolean = false;
  
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute, 
    private _toolbarAdditionService: ToolbarAdditionService,
    private _groupService: GroupService,
    private _router: Router
    ) {
      this.userId = this._userService.userId();
      this._route.params.subscribe( params => this.groupId = params.id );
    }

  ngOnInit(): void {
    const request = this._groupService.getGroupData(this.groupId);
    request.subscribe((result: ApolloQueryResult<GetGroup>) => {
      this.group = result.data.getGroup;

      this._toolbarAdditionService.changeTitleMessage(this.group.name);
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

  leaveGroup(){
    this.showData = false;
    let memberId = this.group.members.find(m => m.userId == this.userId)!.id;
    console.log(memberId)
    this._groupService.leaveGroup(memberId).subscribe(() => {
      this._router.navigate([`calendar/list`])
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
