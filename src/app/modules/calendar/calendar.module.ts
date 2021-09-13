import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarBaseComponent } from './calendar-base/calendar-base.component';
import { EventListComponent } from './event-list/event-list.component';
import { CommonAppModule } from '../common/common-app.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [CalendarBaseComponent, EventListComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CommonAppModule,
    FontAwesomeModule
  ]
})
export class CalendarModule { }
