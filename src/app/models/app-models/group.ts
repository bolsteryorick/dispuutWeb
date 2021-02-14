import { AppEvent } from "./app-event";
import { Member } from "./member";

export interface Group{
    id: string;
    name: string;
    description: string;
    appEvents: AppEvent[];
    members: Member[];
}