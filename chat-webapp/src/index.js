import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubscriptionWithAppolloClient from './SubscriptionWithAppolloClient';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Subscription from './Subcription';
import { ApolloProvider} from '@apollo/client';
import SubscriptionV2 from './SubcriptionV2';
import GraphQLClient from "./graphql/GraphQLConfig";
// import { split } from 'apollo-link';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={GraphQLClient}>
    <SubscriptionV2 />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql, useQuery , HttpLink, split} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { getMainDefinition } from "@apollo/client/utilities";

// const httpLink = createHttpLink({
//   uri: 'http://localhost:7005/v1/graphql',
//   headers: {
//     Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
//   },

// });

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:7005/v1/graphql`,
//   options: {
//     reconnect: true,
//     lazy: true,
//     connectionParams: {
//       headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
//       }
//     }
//   }
// });

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );



// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = process.env.REACT_APP_API_TOKEN
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache()
// });





