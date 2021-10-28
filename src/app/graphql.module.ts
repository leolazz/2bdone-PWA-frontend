import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';
import { from } from 'apollo-link';
import { environment } from '../environments/environment';

// this is here to access the cache directly
export const cache = new InMemoryCache();

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const apolloLink = httpLink.create({
    uri: `${environment.serverUrl}graphql`,
    withCredentials: true,
  });

  return {
    link: from([apolloLink]),
    cache,
    connectToDevTools: true,
  } as ApolloClientOptions<any>;
}

@NgModule({
  exports: [HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
