import { NestedUser } from "./nested-user";

export interface Contact{
    id: string;
    userId: string;
    contactUserId: string;
    emailAddress: string;
    user: NestedUser; 
}