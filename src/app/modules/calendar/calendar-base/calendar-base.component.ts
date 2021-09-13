import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { faPlus, faPlusSquare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/app-models/group';
import { GetUser } from 'src/app/models/user-models/get-user';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-calendar-base',
  templateUrl: './calendar-base.component.html',
  styleUrls: ['./calendar-base.component.scss']
})
export class CalendarBaseComponent implements OnInit {

  faPlus = faPlus;
  groupPickModalActive: boolean = false;
  faUsers = faUsers;
  faPlusSquare = faPlusSquare;
  groups: Group[] = [];
  
  constructor(
    private _router : Router,
    private _groupService: GroupService
    ) { }

  ngOnInit(): void {
    let request = this._groupService.getGroupsForUser();
    request.subscribe((result: ApolloQueryResult<GetUser>) =>{
      this.groups = result.data.getUser.memberships.map(x => x.group);
      this.groups.sort((a,b) => a.name.localeCompare(b.name));
    },
    (error)=>{
      console.log(error);
    })
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
}
