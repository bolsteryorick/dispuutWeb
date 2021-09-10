import { DateInfo } from "./date-info";

export interface WeekInfo{
    dateInfos: DateInfo[];
    year: number;
    week: number;
    startDate: Date;
    endDate: Date;
}