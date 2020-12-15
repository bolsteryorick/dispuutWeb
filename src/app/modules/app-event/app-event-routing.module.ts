import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppEventBaseComponent } from "./app-event-base/app-event-base.component";
import { AppEventViewComponent } from "./app-event-view/app-event-view.component";

const routes: Routes = [
    {
        path: '', 
        component: AppEventBaseComponent,
        children: [
            {path: '', redirectTo: '/calendar/list', pathMatch: "full"},
            {path: 'view', redirectTo: '/calendar/list', pathMatch: "full"},
            {path: 'view/:id', component: AppEventViewComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppEventRoutingModule { }