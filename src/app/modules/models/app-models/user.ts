import { Attendee } from "./attendee";
import { Contact } from "./contact";
import { Member } from "./member";

export interface User{
    id: string;
    email: string;
    userName: string; 
    memberships: Member[];
    attendences: Attendee[];
    contacts: Contact[];
}