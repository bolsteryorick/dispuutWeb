import { Injectable } from '@angular/core';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { DateInfo } from '../../modules/calendar/event-list/models/date-info';
import { EventInfo } from '../../modules/calendar/event-list/models/event-info';
import { AppEvent } from '../../models/app-models/app-event';
import { Group } from '../../models/app-models/group';

@Injectable({
  providedIn: 'root'
})
export class EventInfoService {

  constructor() { }

  public getDataSource(dateEventInfoDict : { [date: string] : EventInfo[]; }) : IDatasource{
    return new Datasource({
      get:(index, count, success) => {
        const data = [];
        for (let i = index; i <= index + count - 1; i++) {
          let dateOfIndex = new Date(new Date().setDate(new Date().getDate() - 31 + i)).toLocaleDateString();
          let dateInfo = <DateInfo>{date : dateOfIndex}
          if(dateEventInfoDict.hasOwnProperty(dateOfIndex)){
            dateInfo.eventInfos = dateEventInfoDict[dateOfIndex];
          }
          data.push(dateInfo);
        }
        success(data);
      },
      settings:{
        startIndex: 31
      }
    })
  }

  public getDateEvents(groups: Group[]): { [date: string] : EventInfo[]; }{
    let sortedEventInfos = this.makeSortedEventInfos(groups);
    return this.makeDateEventInfosDict(sortedEventInfos);
  }

  private makeSortedEventInfos(groups: Group[]) : EventInfo[]{
    var unsortedEventInfos = this.makeEventInfos(groups);
    return this.sortEventInfos(unsortedEventInfos);
  }

  private makeDateEventInfosDict(sortedEventList: EventInfo[]): { [date: string] : EventInfo[]; }{
    var dateEventInfosDict: { [date: string] : EventInfo[]; } = {};
    sortedEventList.forEach(event => {
      if(!dateEventInfosDict.hasOwnProperty(event.startDate)){
        dateEventInfosDict[event.startDate] = [];
      }
      dateEventInfosDict[event.startDate].push(event);
    });
    return dateEventInfosDict;
  }

  private makeEventInfos(groups: Group[]) : EventInfo[]{
    let unsortedEventInfos : EventInfo[] = [];
    groups.forEach(group => {
      if(group.appEvents != null){
        let eventInfos = group.appEvents.map(a => 
          this.makeEventInfo(group, a)
        )
        unsortedEventInfos = unsortedEventInfos.concat(eventInfos);
      }
    });
    return unsortedEventInfos;
  }

  private sortEventInfos(unsortedEventInfos: EventInfo[]){
    return unsortedEventInfos.sort(function(a,b){
      return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
    });
  }

  private makeEventInfo(group: Group, event: AppEvent) : EventInfo{
    return <EventInfo>{
      eventId: event.id,
      eventName: event.name, 
      groupName: group.name,
      startTime: new Date(event.startTime).toLocaleTimeString(),
      endTime: new Date(event.endTime).toLocaleTimeString(),
      startDate: new Date(event.startTime).toLocaleDateString(),
      endDate: new Date(event.endTime).toLocaleDateString(),
      startDateTime: event.startTime,
      groupId: group.id,
    };
  }
}
