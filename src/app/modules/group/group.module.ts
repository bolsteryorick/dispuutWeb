import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupBaseComponent } from './group-base/group-base.component';
import { CommonAppModule } from '../common/common-app.module';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupCreationComponent } from './group-creation/group-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [GroupBaseComponent, GroupViewComponent, GroupCreationComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonAppModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class GroupModule { }
