import { NestedUser } from "./app-models/nested-user";

export interface GetOtherUserData{
    data:GetOtherUser;
}

export interface GetOtherUser{
    getOtherUser: NestedUser;
}