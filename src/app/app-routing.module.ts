import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './modules/authentication/services/auth-guard.service';
import { HomeGuardService } from './modules/authentication/services/home-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuardService]},
  {
    path: 'auth',
    loadChildren: () => {
      return import('src/app/modules/authentication/authentication.module').then(m => m.AuthenticationModule);
    },
    canActivate: [HomeGuardService]
  },
  {
    path: 'calendar',
    loadChildren: () => {
      return import('src/app/modules/calendar/calendar.module').then(m => m.CalendarModule);
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'group',
    loadChildren: () => {
      return import('src/app/modules/group/group.module').then(m => m.GroupModule);
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'event',
    loadChildren: () => {
      return import('src/app/modules/app-event/app-event.module').then(m => m.AppEventModule);
    },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
