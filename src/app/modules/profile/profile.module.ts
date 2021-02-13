import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBaseComponent } from './profile-base/profile-base.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CommonAppModule } from '../common/common-app.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { OtherProfileComponent } from './other-profile/other-profile.component';



@NgModule({
  declarations: [ProfileBaseComponent, MyProfileComponent, OtherProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CommonAppModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ProfileModule { }
