import React from "react";
import { useEffect} from "react";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache, useSubscription, ApolloProvider } from '@apollo/client';
import { gql } from "@apollo/client";

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:7005/v1/graphql',
}));

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const CHAT_MESSAGES_SUBSCRIPTION = gql`
  subscription ChatSubscription {
    chats(where: {id: {_eq: 1}}) {
      chat_messages {
        id
        message
        user {
          id
          first_name
          last_name
        }
      }
    }
  }  
`;

function ChatMessages() {
  const { data, loading, error } = useSubscription(
    CHAT_MESSAGES_SUBSCRIPTION
  );
  console.log("data")
  console.log(data)
  console.log("loading")
  console.log(loading)
  console.log("error")
  console.log(error)
  return <h4>New message: {!loading && data}</h4>;
}

function Subscription() {

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <ApolloProvider client={client} >
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">

        <div className="row">
          <div className="col-12">
            <h1>Hasura Subscription Chat</h1>

            <ChatMessages />
           
          </div>
        </div>
        </div>
      </div>
    </div>
    </ApolloProvider>
  );
}

export default Subscription;