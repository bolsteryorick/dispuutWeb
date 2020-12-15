import { Attendee } from "./attendee";
import { Member } from "./member";

export interface User{
    id: string;
    email: string;
    userName: string;
    memberships: Member[];
    attendences: Attendee[];
}