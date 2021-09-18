import { Injectable } from '@angular/core';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { DateInfo } from '../../modules/calendar/event-list/models/date-info';
import { EventInfo } from '../../modules/calendar/event-list/models/event-info';
import { AppEvent } from '../../models/app-models/app-event';
import { Group } from '../../models/app-models/group';
import moment from 'moment';
import { WeekInfo } from 'src/app/modules/calendar/event-list/models/week-info';
import { Attendee } from 'src/app/models/app-models/attendee';

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

  public getDateEvents(groups: Group[], attendences: Attendee[]): { [date: string] : EventInfo[]; }{
    let sortedEventInfos = this.makeSortedEventInfos(groups, attendences);
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

  private makeSortedEventInfos(groups: Group[], attendences: Attendee[]) : EventInfo[]{
    var unsortedEventInfos = this.makeEventInfos(groups, attendences);
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

  private makeEventInfos(groups: Group[], attendences: Attendee[]) : EventInfo[]{
    let unsortedEventInfos : EventInfo[] = [];
    groups.forEach(group => {
      if(group.appEvents != null){
        let eventInfos = group.appEvents.map(a => 
          this.makeEventInfo(group, a, attendences)
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

  private makeEventInfo(group: Group, event: AppEvent, attendences: Attendee[]) : EventInfo{
    return <EventInfo>{
      eventId: event.id,
      eventName: event.name, 
      groupName: group.name,
      startDateTime: new Date(event.startTime),
      endDateTime: new Date(event.endTime),
      startDate: new Date(event.startTime).toLocaleDateString(),
      groupId: group.id,
      userIsAttending: attendences.some(a => a.appEventId == event.id)
    };
  }
}
