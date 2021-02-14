import { Group } from "./group";
import { NestedUser } from "./nested-user";

export interface Member{
    id: string;
    userId: string;
    groupId: string;
    group: Group;
    user: NestedUser;
    isAdmin: boolean;
}