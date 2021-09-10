import { Injectable } from '@angular/core';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { DateInfo } from '../../modules/calendar/event-list/models/date-info';
import { EventInfo } from '../../modules/calendar/event-list/models/event-info';
import { AppEvent } from '../../models/app-models/app-event';
import { Group } from '../../models/app-models/group';
import moment from 'moment';
import { WeekInfo } from 'src/app/modules/calendar/event-list/models/week-info';



// export interface WeekInfo{
//   eventInfos: EventInfo[];
//   year: number;
//   week: number;
//   startDate: Date;
//   endDate: Date;
// }

@Injectable({
  providedIn: 'root'
})
export class EventInfoService {

  constructor() { }

  public getDataSource(dateEventInfoDict : { [date: string] : EventInfo[]; }) : IDatasource{
    console.log(dateEventInfoDict);
    return new Datasource({
      get:(index, count, success) => {
        const data = [];
        for (let i = index; i <= index + count - 1; i++) {

          let weekShiftedMoment = moment().add(-4 + i, "w"); // todo also change start index to 4
          let weekOfIndex = weekShiftedMoment.week();
          let yearOfIndex = weekShiftedMoment.year();
          let datesOfWeek = this.GetDatesOfWeek(weekOfIndex, yearOfIndex);
          
          let dateInfosForWeek = this.GetDateInfosForDates(datesOfWeek, dateEventInfoDict);
          let weekStartDate = weekShiftedMoment.startOf("week").toDate();
          let weekEndDate = weekShiftedMoment.endOf("week").toDate();
          let weekInfo = <WeekInfo>{dateInfos: dateInfosForWeek, year: yearOfIndex, week: weekOfIndex, startDate: weekStartDate, endDate: weekEndDate};
          data.push(weekInfo);

        }
        success(data);
      },
      settings:{
        startIndex: 4,
        bufferSize: 2
      }
    })
  }

  public getDateEvents(groups: Group[]): { [date: string] : EventInfo[]; }{
    let sortedEventInfos = this.makeSortedEventInfos(groups);
    return this.makeDateEventInfosDict(sortedEventInfos);
  }

  private GetDateInfosForDates(dates: Date[], dateEventInfoDict : { [date: string] : EventInfo[]; }) : DateInfo[]{
    let dateInfos: DateInfo[] = [];
    dates.forEach( (date) => {
      let dateString = date.toLocaleDateString();
      let dateInfo = <DateInfo>{date : date, dateString: dateString};
      if(dateEventInfoDict.hasOwnProperty(dateString)){
        dateInfo.eventInfos = dateEventInfoDict[dateString];
      }
      dateInfos.push(dateInfo);
    });
    return dateInfos;
  }

  private GetDatesOfWeek(week: number, year: number) : Date[]{
    let dates: Date[] = [];
    for(let i = 1; i < 8; i++){
      dates.push(this.GetDateFromWeekNumber(week, year, i))
    }
    return dates;
  }

  private GetDateFromWeekNumber(week: number, year: number, day: number): Date{
    return moment().day(day).week(week).year(year).toDate();
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
      startDateTime: new Date(event.startTime),
      endDateTime: new Date(event.endTime),
      endTime: new Date(event.endTime).toLocaleTimeString(),
      startDate: new Date(event.startTime).toLocaleDateString(),
      endDate: new Date(event.endTime).toLocaleDateString(),
      groupId: group.id,
    };
  }
}
