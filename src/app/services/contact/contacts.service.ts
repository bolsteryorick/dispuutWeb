import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/app/constants/baseUrl';
import { GetAllContacts } from 'src/app/models/contact-models/get-all-contacts';
import { GetUser } from '../../models/user-models/get-user';
import { GraphqlWrapper } from '../graphql-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url: string;
  constructor(
    private _graphqlWrapper: GraphqlWrapper) {
    this.url = `${BaseUrl.baseUrlGraphQL}`;
  }

  public getUserContactsInformation(): Observable<ApolloQueryResult<GetUser>>{
    return this._graphqlWrapper.query<GetUser>({
      query: GETCONTACTSFROMUSERQUERY
    });
  }

  public getAllContacts(): Observable<ApolloQueryResult<GetAllContacts>>{
    return this._graphqlWrapper.query<GetAllContacts>({
      query: GETALLCONTACTSQUERY
    });
  }

  public createContact(contactId: string){
    return this._graphqlWrapper.mutate({
      mutation: CREATECONTACTMUTATION,
      variables: {
        contactId: contactId
      }
    });
  }

}

const GETALLCONTACTSQUERY = gql`
  query{
    getAllContacts{
      emailAddress,
      contactUserId
    }
  }`;

const GETCONTACTSFROMUSERQUERY = gql`
  query{
    getUser{
        id,
        contacts{
            emailAddress,
            contactUserId,
            user{
              userName
            }
        }
    }
  }`;

const CREATECONTACTMUTATION = gql`
  mutation CreateContact(
      $contactId: String!
      ) {
        createContact(contactId: $contactId){
          id
        }
  }`;