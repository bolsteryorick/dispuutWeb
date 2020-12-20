import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-base',
  templateUrl: './calendar-base.component.html',
  styleUrls: ['./calendar-base.component.scss']
})
export class CalendarBaseComponent implements OnInit {

  constructor(
    private _router : Router
    ) { }

  ngOnInit(): void {
  }

  createGroup(){
    this._router.navigate(["/group/create"])
  }
}
