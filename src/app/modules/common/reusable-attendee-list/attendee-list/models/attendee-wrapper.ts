import { Attendee } from "src/app/models/app-models/attendee";

export interface AttendeeWrapper{
    attendee: Attendee;
    paidButtonDisabled: boolean;
}