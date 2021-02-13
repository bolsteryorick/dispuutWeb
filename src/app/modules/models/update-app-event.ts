import { AppEvent } from "./app-models/app-event";

export interface UpdateAppEventData{
    data:UpdateAppEvent;
}

export interface UpdateAppEvent{
    updateAppEvent: AppEvent;
}