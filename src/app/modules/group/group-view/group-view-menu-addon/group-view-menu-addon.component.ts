import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';

@Component({
  selector: 'app-group-view-menu-addon',
  templateUrl: './group-view-menu-addon.component.html',
  styleUrls: ['./group-view-menu-addon.component.scss']
})
export class GroupViewMenuAddonComponent implements OnInit {

  constructor(
    private _toolbarAdditionService: ToolbarAdditionService,
    private _router: Router
    ) { }
  groupId: string = "";
  ngOnInit(): void {
    this._toolbarAdditionService.GroupInfoIdMessage.subscribe(m => this.groupId = m);
  }

  goToGroupInformation(){
    this._router.navigate([`/group/groupInformation/${this.groupId}`])
  }
}
