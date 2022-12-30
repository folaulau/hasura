import React from "react";
import { useEffect} from "react";
import { WebSocketLink } from '@apollo/client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from '@apollo/client';
import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';

import { ApolloClient, ApolloProvider, HttpLink } from '@apollo/client';


const wsClient = new SubscriptionClient(
  'wss://localhost:7005/v1/graphql',
  { reconnect: true }
);

const client = new ApolloClient({
  link: new WebSocketLink(wsClient),
  cache: new InMemoryCache(),
});

const CHAT_MESSAGES_SUBSCRIPTION = gql`
  subscription ChatSubscription {
    chats(where: {id: {_eq: "1"}}) {
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
  const { data, loading, error } = useSubscription(CHAT_MESSAGES_SUBSCRIPTION);

  console.log("data")
  console.log(data)
  console.log("loading")
  console.log(loading)
  console.log("error")
  console.log(error)

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      {data.chats[0]['chat_messages'][0].id}
      {data.chats[0]['chat_messages'][0].message}
    </div>
  );
}

function App() {



  useEffect(() => {



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">

        <div className="row">
          <div className="col-12">
            <h1>Hasura Chat</h1>

            <ChatMessages />
           
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;