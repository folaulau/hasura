import React from "react";
import { useEffect, Fragment, useState } from "react";

// import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from '@apollo/client/utilities';

// import UserApi from "./api/UserApi";
import UserGraphQL from "./graphql/UserGraphQL";

import { useQuery, gql, useSubscription } from '@apollo/client';
import GraphQLClient from "./graphql/GraphQLConfig";

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

  const userData = useQuery(GET_USER_DATA);
  //userData.loading = loading
  //userData.error = error
  console.log('userData ', userData)

  let userId = 2

  const userSubData = useSubscription(SUB_USER_DATA);

  // console.log(userSubLoading)
  // console.log(userSubError)
  console.log('userSubData, ',userSubData)

  let apiToken = process.env.REACT_APP_API_TOKEN

  console.log("Subscription apiToken, ", apiToken)

  const [userInfo, setUserInfo] = useState({"firstName":"", "lastName":""})

  const [userDetails, setUserDetails] = useState({"firstName":"", "lastName":""})

  useEffect(() => {

    GraphQLClient
    .query({
      query: GET_USER_DATA
    })
    .then((result) => {
      console.log(`client query result`)
      console.log(result.data.users[0])
      setUserDetails(result.data.users[0])


    });

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
            
              <hr/>
              <div>
                <b>Appollo useQuery</b>
              </div>
            
              <div>
              {
                !userData.loading && 
                JSON.stringify(userData.data)
              }
              </div>

              <hr/>
              <div>
                <b>Appollo useSubscription</b>
              </div>
              <div>data</div>
              {
                JSON.stringify(userSubData)
              }
              <div>error</div>
              {/* {
                JSON.stringify(userSubError)
              } */}
              <hr/>
              <div><b>Appollo Client query</b></div>
              <div>data</div>

              {
                JSON.stringify(userDetails)
              }
   
            
            </div>
          </div>


          </div>
        </div>
        </Fragment>
      </div>
  );
}

export default SubscriptionV2;