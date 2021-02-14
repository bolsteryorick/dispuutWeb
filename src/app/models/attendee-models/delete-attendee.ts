import { Attendee } from "../app-models/attendee";

export interface DeleteAttendeeData{
    data:DeleteAttendee;
}

export interface DeleteAttendee{
    deleteAttendee: Attendee;
}