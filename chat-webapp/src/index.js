import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubscriptionWithAppolloClient from './SubscriptionWithAppolloClient';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Subscription from './Subcription';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql, useQuery , HttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpLink = createHttpLink({
  uri: 'http://localhost:7005/v1/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  },

});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.REACT_APP_API_TOKEN
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// const client = new ApolloClient({
//   // uri: 'http://localhost:7005/v1/graphql',
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

const client = () => {
  return new ApolloClient({
      link: new WebSocketLink({
        uri: 'ws://localhost:7005/v1/graphql',
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
            }
          }
        }
      }),
      cache: new InMemoryCache(),
    })
  
}



root.render(
  <ApolloProvider client={client()}>
    <Subscription />
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
