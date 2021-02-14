import { gql } from "@apollo/client/core";

export class GroupQueries{
    public static GetGroupDataQuery = gql`
        query GetGroupById($groupId: ID!) {
            getGroup(id: $groupId){
                id,
                name,
                description,
                appEvents{
                    id,
                    name,
                    description,
                    startTime,
                    endTime
                },
                members{
                    id,
                    isAdmin,
                    userId,
                    user{
                    userName
                    }
                }
                }
        }`;

    public static CreateGroupMutation = gql`
        mutation CreateGroup(
            $name: String!,
            $description: String,
            $userIds: [String]
            ) {
            createGroup(
                name: $name, 
                description: $description, 
                userIds: $userIds){
            id,
            name,
            description
            }
        }`;

    public static CreateGroupMembersMutation = gql`
        mutation CreateGroup(
            $groupId: ID!,
            $userIds: [String]
            ) {
            createMembers(
                userIds: $userIds,
                groupId: $groupId){
            groupId,
            }
        }`;

    public static LeaveGroupMutation = gql`
        mutation LeaveGroup(
            $memberId: ID!
            ) {
            leaveGroup(
                memberId: $memberId){
            id,
            }
        }`;

    public static GetGroupMembersQuery = gql`
        query GetGroupMembersByGroupId($groupId: ID!) {
            getGroup(id: $groupId){
                members{
                    user{
                        email
                    }
                }
            }
        }`;

    public static UpdateGroupMutation = gql`
        mutation UpdateGroup(
            $id: ID!,
            $description: String,
            $name: String
            ) {
            updateGroup(
                id: $id,
                description: $description,
                name: $name
            ){
                id,
            }
        }`;
}