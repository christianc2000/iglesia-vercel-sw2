"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

// have a function to create a client for you
function makeClient() {
  const staticToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHJpc3RpYW5AZ21haWwuY29tIiwiaWF0IjoxNzE4MzE1NDExLCJleHAiOjE3MTgzMTkwMTF9.2fxHVBHdacgWfxXkOIkF1Witdwsezw4YgIKmRq06JBg";
  const httpLink = new HttpLink({
    uri: "https://7d54-143-137-114-49.ngrok-free.app/graphql",
    fetchOptions: { cache: "no-store" },
    headers: {
      authorization: `Bearer ${staticToken}`,
    },
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

//
// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}