import { SplitInterpolation } from "@angular/compiler";
import { AppEvent } from "src/app/models/app-models/app-event";

export interface EventInfo{
    eventId: string;
    eventName: string;
    groupName: string;
    startDate: string;
    startDateTime: Date;
    endDateTime: Date;
    groupId: string;
}