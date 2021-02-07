import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/modules/authentication/services/user.service';
import { Member } from 'src/app/modules/models/app-models/member';

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

  constructor(_userService: UserService) {
    this._userId = _userService.userId();
  }
  
  ngOnInit(): void {
  }

  showDeleteMember(){
    return this.editPossible && this.member.userId != this._userId;
  }

  deleteMember(memberId: string){
    this.delete.emit(memberId);
  }

}
