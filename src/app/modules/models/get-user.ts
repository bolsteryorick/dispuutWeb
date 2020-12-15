import { User } from "./app-models/user";

export interface GetUserData{
    data:GetUser;
}

export interface GetUser{
    getUser: User;
}