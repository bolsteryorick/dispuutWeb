import { Member } from "../app-models/member";

export interface DeleteMemberData{
    data:DeleteMember;
}

export interface DeleteMember{
    deleteMember: Member;
}