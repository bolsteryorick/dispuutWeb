import { Attendee } from "./attendee";
import { Group } from "./group";

export interface AppEvent{
    id: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    groupId: string;
    maxAttendees?: number | null;
    group: Group;
    attendees: Attendee[];
}