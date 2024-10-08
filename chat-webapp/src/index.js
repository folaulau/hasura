import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider} from '@apollo/client';
import Subscription from './Subcription';
import Routes from './routes';
import GraphQLClient from "./graphql/GraphQLConfig";
// import { split } from 'apollo-link';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={GraphQLClient}>
    {/* <Subscription /> */}
    <Routes />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();