import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupBaseComponent } from './group-base/group-base.component';
import { CommonAppModule } from '../common/common-app.module';
import { GroupViewComponent } from './group-view/group-view.component';
import { UiScrollModule } from 'ngx-ui-scroll';



@NgModule({
  declarations: [GroupBaseComponent, GroupViewComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonAppModule,
  ]
})
export class GroupModule { }
