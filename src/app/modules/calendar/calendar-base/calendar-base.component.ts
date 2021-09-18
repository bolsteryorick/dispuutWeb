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

  constructor() { }

  ngOnInit(): void {}
}
