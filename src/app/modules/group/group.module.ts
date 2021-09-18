import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupBaseComponent } from './group-base/group-base.component';
import { CommonAppModule } from '../common/common-app.module';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupCreationComponent } from './group-creation/group-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GroupAddMembersComponent } from './group-add-members/group-add-members.component';
import { ContactSelectComponent } from './contact-select/contact-select.component';
import { GroupsOverviewComponent } from './groups-overview/groups-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupViewMenuAddonComponent } from './group-view/group-view-menu-addon/group-view-menu-addon.component';
import { GroupInformationComponent } from './group-information/group-information.component';



@NgModule({
  declarations: [GroupBaseComponent, GroupViewComponent, GroupCreationComponent, GroupAddMembersComponent, ContactSelectComponent, GroupsOverviewComponent, GroupViewMenuAddonComponent, GroupInformationComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonAppModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FontAwesomeModule
  ]
})
export class GroupModule { }
