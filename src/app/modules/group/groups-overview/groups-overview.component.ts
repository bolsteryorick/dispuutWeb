import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Group } from 'src/app/models/app-models/group';
import { GetUser } from 'src/app/models/user-models/get-user';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-groups-overview',
  templateUrl: './groups-overview.component.html',
  styleUrls: ['./groups-overview.component.scss']
})
export class GroupsOverviewComponent implements OnInit {

  groups: Group[] = [];
  constructor(
    private _groupService: GroupService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    let request = this._groupService.getGroupsForUser();
    request.subscribe((result: ApolloQueryResult<GetUser>) =>{
      this.groups = result.data.getUser.memberships.map(x => x.group);
    },
    (error)=>{
      console.log(error);
    })
  }

  groupClicked(groupId: string){
    this._router.navigate([`/group/view/${groupId}`])
  }

}
