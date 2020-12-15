import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarBaseComponent } from './calendar-base/calendar-base.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  {
    path: '', 
    component: CalendarBaseComponent,
     children: [
       {path: '', redirectTo: 'list', pathMatch: "full"},
       {path: 'list', component: EventListComponent}
     ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
