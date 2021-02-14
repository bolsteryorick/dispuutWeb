import { gql } from "@apollo/client/core";

export class AttendeeQueries{
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

    public static AttendeesByAppEventId = gql`
        query GetAppEventById($eventId: ID!) {
            getAppEvent(id: $eventId){
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
      
    public static UpdateAttendeeMutation = gql`
        mutation UpdateAttendee(
            $id: ID!,
            $paid: Boolean
            ) {
            updateAttendee(id: $id, paid: $paid){
              id
            }
        }`;
      
    public static DeleteAttendeeMutation = gql`
        mutation DeleteAttendee(
            $id: ID!
            ) {
            deleteAttendee(id: $id){
              id
            }
        }`;
}