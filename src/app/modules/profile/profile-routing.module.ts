import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { OtherProfileComponent } from "./other-profile/other-profile.component";
import { ProfileBaseComponent } from "./profile-base/profile-base.component";

const routes: Routes = [
    {
      path: '', 
      component: ProfileBaseComponent,
       children: [
         {path: '', redirectTo: 'my-profile', pathMatch: "full"},
         {path: 'my-profile', component: MyProfileComponent},
         {path: 'profile/:id', component: OtherProfileComponent},
       ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule { }