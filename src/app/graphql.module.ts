import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClientOptions, from, InMemoryCache } from '@apollo/client/core';
import { Storage } from '@ionic/storage-angular';

export const cache = new InMemoryCache();

export function createApollo(
  httpLink: HttpLink,
  storage: Storage
): ApolloClientOptions<any> {
  const authLink = setContext(async (_, { headers }) => {
    const token = await storage.get('token');
    if (!token) {
      return {};
    } else {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    let err: string;
    console.log('errorLink');
    graphQLErrors?.forEach(({ message, locations, path }) => {
      err += `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
        locations
      )}, Path: ${JSON.stringify(path)} \n`;
    });
    err += `[Network error]: ${JSON.stringify(networkError)}`;
    console.log(err);
  });

  const apolloLink = httpLink.create({
    uri: `/graphql`,
    withCredentials: true,
  });

  return {
    link: from([errorLink, authLink, apolloLink]),
    cache,
  } as ApolloClientOptions<any>;
}
@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Storage],
    },
  ],
})
export class GraphQLModule {}
