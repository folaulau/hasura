import React from "react";
import { useEffect, Fragment, useState } from "react";

// import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from '@apollo/client/utilities';

// import UserApi from "./api/UserApi";
import UserGraphQL from "./graphql/UserGraphQL";

// import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
// import { WebSocketLink } from "@apollo/client/link/ws";

// import { Fragment } from "react";
// import { useMutation, useSubscription, gql, useQuery } from "@apollo/client";

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


// const httpLink = new HttpLink({
//   uri: 'http://localhost:7005/v1/graphql'
// });

// const wsLink = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:7005/v1/graphql',
// }));

// const splitLink = split(
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

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache()
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:7005/v1/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  },

});

// // Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `http://localhost:7005/v1/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    onnectionParams: {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
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
  link: link,
  cache: new InMemoryCache()
});

const GET_USER_DATA = gql`
  query GetUserInfo {
    users {
        id
        lastName: last_name
        firstName: first_name
        phoneNumber: phone_number
        updated_at
        user_type
        uuid
        email
        dob
        created_at
    }
  }
`;

// https://www.apollographql.com/docs/react/api/react/hooks/#usesubscription
const SUB_USER_DATA = gql`
  subscription MySubscription {
    users{
      id
      first_name
      last_name
    }
  }
`;

function SubscriptionV2() {

  // const { loading, error, data } = useQuery(GET_USER_DATA);

  let userId = 2

  const userSubData = useSubscription(SUB_USER_DATA);

  // console.log(userSubLoading)
  // console.log(userSubError)
  console.log('userSubData, ',userSubData)

  let apiToken = process.env.REACT_APP_API_TOKEN

  const [userInfo, setUserInfo] = useState({"firstName":"", "lastName":""})

  useEffect(() => {

  client
  .query({
    query: gql`
      query GetUserInfo {
        users {
            id
            lastName: last_name
            firstName: first_name
            phoneNumber: phone_number
            updated_at
            user_type
            uuid
            email
            dob
            created_at
        }
      }
    `,
  })
  .then((result) => {
    console.log(`client query result`)
    console.log(result)
  });

    console.log("Subscription apiToken, ", apiToken)

    UserGraphQL.getUserDetails().then((response) => {
      console.log("getUserDetails response: ", response);
      let data = response.data.data.users[0]
      setUserInfo(data)
      console.log("getUserDetails data: ", data);
    }).catch((error) => {
      console.error("getUserDetails Error: ", error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
      <div className="container">
        <Fragment>
        <div className="row">
          <div className="col-6 offset-3">

          <div className="row">
            <div className="col-12">
              <h1>Hasura Subscription V2</h1>

              {/* <ChatMessages /> */}
            
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h5>Hello {userInfo.firstName} {userInfo.lastName}, id={userInfo.id}, userTye={userInfo.userType}</h5>
              <div>

              <div>
                <b>Subscription</b>
              </div>
              <div>data</div>
              {
                JSON.stringify(userSubData)
              }
              <div>error</div>
              {/* {
                JSON.stringify(userSubError)
              } */}

              <div><b>GraphQL</b></div>
              <div>data</div>
              </div>
              {/* <ChatMessages /> */}

              {/* {
                JSON.stringify(data)
              }
    */}
            
            </div>
          </div>


          </div>
        </div>
        </Fragment>
      </div>
  );
}

export default SubscriptionV2;