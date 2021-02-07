import { Attendee } from "../app-models/attendee";

export interface UpdateAttendeeData{
    data:UpdateAttendee;
}

export interface UpdateAttendee{
    updateAttendee: Attendee;
}