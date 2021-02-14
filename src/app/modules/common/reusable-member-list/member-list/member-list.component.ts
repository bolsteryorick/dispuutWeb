import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/app-models/member';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  @Input() members!: Member[];
  @Input() userIsAdmin: boolean = false;
  @Input() inGroupView: boolean = false;
  constructor(
    private _memberService: MemberService
  ) { }

  ngOnInit(): void {
  }

  deleteMember(memberId: string){
    this.members = this.members.filter(x => x.id != memberId);
    this._memberService.deleteMember(memberId).subscribe();
  }
}
