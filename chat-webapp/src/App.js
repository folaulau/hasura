import logo from './logo.svg';
import './App.css';
import React from "react";
import { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import GraphQL from './graphql/graphql'
import UserApi from './api/userApi';
// import { useMutation, gql } from "@apollo/client";
import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {

  const MESSAGES_SUBSCRIPTION = gql`
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

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:7005/v1/graphql'
  }));

  const httpLink = new HttpLink({
    uri: 'http://localhost:7005/v1/graphql'
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

  function LatestComment() {
    const { data, loading } = useSubscription(
      MESSAGES_SUBSCRIPTION
    );
    console.log("data")
    console.log(data)
    return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
  }

  // let query = useQuery();
  
  // const client = useApolloClient();

  const[chatId, setChatId] = useState(1)

  const { data, loading } = useSubscription(
    MESSAGES_SUBSCRIPTION
  );

  console.log("chat data: ")
  console.log(data)

  useEffect(() => {
    console.log("chatId: "+chatId)
    // const interval = setInterval(() => {
    //   loadData()
    // }, 2000);
    // return () => clearInterval(interval);



    UserApi.login(1)
    .then((response)=>{
      console.log("login, ", response.data)
      let responseData = response.data

      localStorage.setItem("authToken", responseData.token)

      // loadChatMessages()

      

    })
    .catch((error)=>{
        console.log("error, ", error.response.data)
    });

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadChatMessages = async () => {
    console.log("loadChatMessages - chat id: "+chatId)


    const GET_NEW_PUBLIC_TODOS = gql`
     subscription ChatSubscription {
      chats(where: {id: {_eq: "`+chatId+`"}}) {
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
   const { error, data } = await client.query({
      query: GET_NEW_PUBLIC_TODOS
    });


    // GraphQL.getChatMessages(chatId)
    // .then((response)=>{
    //   console.log("messages, ", response.data)
    //   let data = response.data

    // })
    // .catch((error)=>{
    //     console.log("error, ", error.response.data)
    // });
  }


  return (
    <ApolloProvider client={client}>
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">

        <div className="row">
          <div className="col-12">
            <h1>Chat</h1>
           
            <LatestComment />
            
           
          </div>
        </div>
        </div>
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
