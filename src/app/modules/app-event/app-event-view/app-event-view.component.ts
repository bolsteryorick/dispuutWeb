import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEvent } from '../../models/app-models/app-event';
import { GetAppEventData } from '../../models/get-app-event';
import { AppEventService } from '../services/app-event.service';

@Component({
  selector: 'app-app-event-view',
  templateUrl: './app-event-view.component.html',
  styleUrls: ['./app-event-view.component.scss']
})
export class AppEventViewComponent implements OnInit {
  private appEventId!: string;
  public appEvent!: AppEvent;
  public showData: boolean = false;
  constructor(
    private route: ActivatedRoute, 
    private _appEventService: AppEventService
    ) {
    this.route.params.subscribe( params => this.appEventId = params.id );
  }

  ngOnInit(): void {
    const request = this._appEventService.getAppEventData(this.appEventId);
    request.subscribe((result: GetAppEventData) => {
      this.appEvent = result.data.getAppEvent;
      this.showData = true;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
