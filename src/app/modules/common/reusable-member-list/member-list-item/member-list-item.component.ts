import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/modules/models/app-models/member';

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {

  @Input() member!: Member;
  constructor() { }
  
  ngOnInit(): void {
  }

}
