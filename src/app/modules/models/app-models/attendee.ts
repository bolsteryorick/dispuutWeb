import { AppEvent } from "./app-event";
import { NestedUser } from "./nested-user";

export interface Attendee{
    id: string;
    userId: string;
    appEventId: string;
    paid: boolean;
    appEvent: AppEvent;
    user: NestedUser;
}