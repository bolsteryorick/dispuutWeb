import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-wrapper',
  templateUrl: './spinner-wrapper.component.html',
  styleUrls: ['./spinner-wrapper.component.scss']
})
export class SpinnerWrapperComponent implements OnInit {

  @Input() showSpinner: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
