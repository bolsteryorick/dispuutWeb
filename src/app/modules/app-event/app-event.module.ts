import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEventBaseComponent } from './app-event-base/app-event-base.component';
import { AppEventViewComponent } from './app-event-view/app-event-view.component';
import { CommonAppModule } from '../common/common-app.module';
import { AppEventRoutingModule } from './app-event-routing.module';



@NgModule({
  declarations: [AppEventBaseComponent, AppEventViewComponent],
  imports: [
    CommonModule,
    CommonAppModule,
    AppEventRoutingModule
  ]
})
export class AppEventModule { }
