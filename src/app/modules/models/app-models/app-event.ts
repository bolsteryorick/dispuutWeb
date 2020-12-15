import { IncomingHttpHeaders } from "http";
import { Attendee } from "./attendee";
import { Group } from "./group";

export interface AppEvent{
    id: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    groupId: string;
    maxAttendees: number;
    group: Group;
    attendees: Attendee[];
}