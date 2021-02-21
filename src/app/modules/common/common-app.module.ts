import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavBarComponent } from './home-nav-bar/home-nav-bar.component';
import { RouterModule } from '@angular/router';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { EventListDayComponent } from './reusable-event-list/event-list-day/event-list-day.component';
import { EventListItemComponent } from './reusable-event-list/event-list-item/event-list-item.component';
import { ReusableEventListComponent } from './reusable-event-list/reusable-event-list/reusable-event-list.component';
import { UiScrollModule } from 'ngx-ui-scroll';
import { MemberListItemComponent } from './reusable-member-list/member-list-item/member-list-item.component';
import { MemberListComponent } from './reusable-member-list/member-list/member-list.component';
import { AttendeeListItemComponent } from './reusable-attendee-list/attendee-list-item/attendee-list-item.component';
import { AttendeeListComponent } from './reusable-attendee-list/attendee-list/attendee-list.component';
import { EditInPlaceComponent } from './editing/edit-in-place/edit-in-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from './editing/directives/auto-focus.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerWrapperComponent } from './spinner-wrapper/spinner-wrapper.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({ 
  declarations: [
    HomeNavBarComponent, 
    ToolBarComponent, 
    EventListItemComponent,
    EventListDayComponent,
    ReusableEventListComponent,
    MemberListItemComponent,
    MemberListComponent,
    AttendeeListItemComponent,
    AttendeeListComponent,
    EditInPlaceComponent,
    AutoFocusDirective,
    SpinnerComponent,
    SpinnerWrapperComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    HomeNavBarComponent,
    ToolBarComponent,
    EventListItemComponent,
    EventListDayComponent,
    ReusableEventListComponent,
    MemberListItemComponent,
    MemberListComponent,
    AttendeeListItemComponent,
    AttendeeListComponent,
    EditInPlaceComponent,
    SpinnerComponent,
    SpinnerWrapperComponent,
    ConfirmDialogComponent
  ]
})
export class CommonAppModule { }