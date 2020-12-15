import { AppEvent } from "./app-models/app-event";

export interface GetAppEventData{
    data:GetAppEvent;
}

export interface GetAppEvent{
    getAppEvent: AppEvent;
}