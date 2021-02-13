import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetGroupData } from '../../models/get-group';
import { CreateMembersData } from '../../models/members/create-members';
import { ContactItem } from '../group-creation/models/contactItem';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-add-members',
  templateUrl: './group-add-members.component.html',
  styleUrls: ['./group-add-members.component.scss']
})
export class GroupAddMembersComponent implements OnInit {
  private groupId!: string;
  public usedEmails: Array<string> = [];
  selectedContacts: Array<ContactItem> = [];

  constructor(
    private route: ActivatedRoute, 
    private _groupService: GroupService,
    private _router: Router
    ) {
    this.route.params.subscribe( params => this.groupId = params.id );
  }

  ngOnInit(): void {
    const request = this._groupService.getGroupMemberEmails(this.groupId);
    request.subscribe((result: GetGroupData) => {
      this.usedEmails = result.data.getGroup.members.map(x => x.user.email);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  selectedContactsChanged(items: ContactItem[]){
    this.selectedContacts = items;
  }

  buttonDisabled(): boolean{
    return this.selectedContacts.length < 1;
  }

  addGroupMembers(){
    let userIds = this.selectedContacts.map(s => s.userId);
    this._groupService.createGroupMembers(this.groupId, userIds)
    .subscribe((result: CreateMembersData) => {
      this._router.navigate([`/group/view/${this.groupId}`])
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
