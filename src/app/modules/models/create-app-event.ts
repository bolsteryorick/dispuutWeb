import { AppEvent } from "./app-models/app-event";

export interface CreateAppEventData{
    data:CreateAppEvent;
}

export interface CreateAppEvent{
    createAppEvent: AppEvent;
}