import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult, MutationOptions, QueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlWrapper {

  constructor(
    private _apollo: Apollo) { }

  public query<T>(queryOptions: QueryOptions<EmptyObject>): Observable<ApolloQueryResult<T>>{
    return this._apollo.query<T>(queryOptions);
  }

  public mutate<T>(queryOptions: MutationOptions<T, EmptyObject>): Observable<FetchResult<T>>{
    return this._apollo.mutate<T>(queryOptions);
  }
}