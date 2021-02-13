import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAddMembersComponent } from './group-add-members/group-add-members.component';
import { GroupBaseComponent } from './group-base/group-base.component';
import { GroupCreationComponent } from './group-creation/group-creation.component';
import { GroupViewComponent } from './group-view/group-view.component';

const routes: Routes = [
  {
    path: '', 
    component: GroupBaseComponent,
     children: [
       {path: '', redirectTo: '/calendar/list', pathMatch: "full"},
       {path: 'view', redirectTo: '/calendar/list', pathMatch: "full"},
       {path: 'addMembers', redirectTo: '/calendar/list', pathMatch: "full"},
       {path: 'create', component: GroupCreationComponent},
       {path: 'addMembers/:id', component: GroupAddMembersComponent},
       {path: 'view/:id', component: GroupViewComponent}
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
