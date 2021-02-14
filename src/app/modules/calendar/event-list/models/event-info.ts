import { SplitInterpolation } from "@angular/compiler";
import { AppEvent } from "src/app/models/app-models/app-event";

export interface EventInfo{
    eventId: string;
    eventName: string;
    groupName: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    startDateTime: Date;
    groupId: string;
}