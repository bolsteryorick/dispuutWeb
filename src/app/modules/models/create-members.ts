import { Member } from "./app-models/member";

export interface CreateMembersData{
    data:CreateMembers;
}

export interface CreateMembers{
    createMembers: Member;
}