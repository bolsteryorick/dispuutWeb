import { Component, Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarAdditionService {

  private titleMessageSource = new BehaviorSubject('');
  currentTitleMessage = this.titleMessageSource.asObservable();

  private groupInfoIdMessageSource = new BehaviorSubject('');
  GroupInfoIdMessage = this.groupInfoIdMessageSource.asObservable();

  constructor() { }

  changeTitleMessage(message: string) {
    this.titleMessageSource.next(message);
  }

  changeGroupInfoIdMessage(message: string){
    this.groupInfoIdMessageSource.next(message);
  }
}
