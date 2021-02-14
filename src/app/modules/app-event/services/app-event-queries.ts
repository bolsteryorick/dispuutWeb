import { DocumentNode, gql } from "@apollo/client/core";

export class AppEventQueries{
    public static GetAppEventDataQuery = gql`
        query GetAppEventById($eventId: ID!) {
            getAppEvent(id: $eventId){
                endTime,
                id,
                name,
                description,
                startTime,
                maxAttendees,
                group{
                members{
                    isAdmin,
                    userId,
                    user{
                    userName
                    }
                }
                },
                attendees{
                user{
                    userName,
                    id
                },
                id,
                paid
                }
            }
        }`;

    public static CreateAppEventMutation = gql`
        mutation CreateAppEvent(
            $name: String!,
            $description: String!,
            $startTime: DateTime!,
            $endTime: DateTime!,
            $maxAttendees: Int,
            $groupId: ID!
            ) {
            createAppEvent(
                name: $name, 
                description: $description, 
                startTime: $startTime, 
                endTime: $endTime,
                maxAttendees: $maxAttendees,
                groupId: $groupId){
            id,
            name,
            description
            }
        }`;
    public static UpdateAppEventMutation = gql`
        mutation UpdateAppEvent(
            $id: ID!,
            $name: String,
            $description: String,
            $startTime: DateTime,
            $endTime: DateTime,
            $maxAttendees: Int
            ) {
            updateAppEvent(
                id: $id,
                name: $name, 
                description: $description, 
                startTime: $startTime, 
                endTime: $endTime,
                maxAttendees: $maxAttendees){
            id,
            name,
            description
            }
        }`;
    public static joinEventMutation = gql`
        mutation JoinEventMutation($eventId: ID!) {
            joinEvent(eventId: $eventId){
                id
            }
        }`;
    public static leaveEventMutation = gql`
        mutation JoinEventMutation($attendeeId: ID!) {
            leaveEvent(attendeeId: $attendeeId){
                id
              }
        }`;
}