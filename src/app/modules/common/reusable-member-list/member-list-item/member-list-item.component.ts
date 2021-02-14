import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/app-models/member';
import { UserService } from 'src/app/services/authentication/user.service';

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {

  @Input() member!: Member;
  @Input() editPossible: boolean = false;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  private _userId!: string;

  constructor(
    userService: UserService,
    private _router: Router) {
    this._userId = userService.userId();
  }
  
  ngOnInit(): void {
  }

  showDeleteMember(){
    return this.editPossible && this.member.userId != this._userId;
  }

  deleteMember(memberId: string){
    this.delete.emit(memberId);
  }

  goToOtherProfile(){
    this._router.navigate([`/profile/profile/${this.member.userId}`]);
  }

}
