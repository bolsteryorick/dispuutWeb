import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEventBaseComponent } from './app-event-base/app-event-base.component';
import { AppEventViewComponent } from './app-event-view/app-event-view.component';
import { CommonAppModule } from '../common/common-app.module';
import { AppEventRoutingModule } from './app-event-routing.module';
import { AppEventCreationComponent } from './app-event-creation/app-event-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventDateEditComponent } from './event-date-edit/event-date-edit.component';



@NgModule({
  declarations: [
    AppEventBaseComponent, 
    AppEventViewComponent, 
    AppEventCreationComponent, EventDateEditComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule,
    AppEventRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppEventModule { }
