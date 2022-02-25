import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from './enviroments/enviroment.prod';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            // uri: `/graphql`,
            uri: 'http://localhost:3000/graphql',
            withCredentials: true,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
