// import React from "react";
// import { useEffect} from "react";
// import { ApolloClient } from 'apollo-client';
// import { WebSocketLink } from 'apollo-link-ws';
// import { SubscriptionClient } from 'subscriptions-transport-ws';


// const headers = {
//   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiYXVkIjoiaGFzdXJhYXBpIiwicm9sZSI6InVzZXIiLCJpc3MiOiJoYXN1cmFhcGkiLCJuYW1lIjoiTGlzYSBLYXZlaW5nYSIsImV4cCI6MTY4ODUxNDY1NCwiaWF0IjoxNjcxMjM4MjU0LCJ1dWlkIjoidXNlci03MjVkYzQwZS0zNzYwLTRjMzctOTgwNi1mZGEyMjRjYTcyMjUiLCJqdGkiOiJkMDFmYWMwZS01MWMyLTRmYmUtODI1NS05NzMyNGJjYzE2MjQtTHdlcUlLUVpFZyIsImhhc3VyYSI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1IYXN1cmEtdXNlci1pZCI6IjIiLCJ4LUhhc3VyYS11c2VyLXV1aWQiOiJ1c2VyLTcyNWRjNDBlLTM3NjAtNGMzNy05ODA2LWZkYTIyNGNhNzIyNSIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImVuZ2luZWVyIiwiYWRtaW4iXX19.IAgi5dUIxbvRnBjNKhFA_L1DSMygwEv5pzIxyWRT4kc',
// }

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:7005/v1/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       headers: headers
//     }
//   }
// });

// // const client = new ApolloClient({
// //   link: wsLink
// // });


// const CHAT_MESSAGES_SUBSCRIPTION = gql`
//   subscription ChatSubscription {
//     chats(where: {id: {_eq: "1"}}) {
//       id
//       title
//       chat_messages {
//         id
//         message
//         user {
//           id
//           first_name
//           last_name
//         }
//       }
//     }
//   }  
// `;

// function ChatMessages() {
//   const { data, loading, error } = useSubscription(CHAT_MESSAGES_SUBSCRIPTION);

//   console.log("data")
//   console.log(data)
//   console.log("loading")
//   console.log(loading)
//   console.log("error")
//   console.log(error)

//   if (loading) return 'Loading...';
//   if (error) return `Error: ${error.message}`;

//   return (
//     <div>
//       {data}
//     </div>
//   );
// }

// function SubscriptionWithAppolloClient() {



//   useEffect(() => {

//     console.log("SubscriptionWithAppolloClient")


//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);



//   return (
//     <ApolloProvider client={client}>
//       <div className="container">
//         <div className="row">
//           <div className="col-6 offset-3">

//           <div className="row">
//             <div className="col-12">
//               <h1>Hasura Chat</h1>

//               <ChatMessages />
            
//             </div>
//           </div>
//           </div>
//         </div>
//       </div>
//     </ApolloProvider>
//   );
// }

// export default SubscriptionWithAppolloClient;