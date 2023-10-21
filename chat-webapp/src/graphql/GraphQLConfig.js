import { ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// var bearerToken = process.env.REACT_APP_API_TOKEN

var hasuraWebSocketUrl = process.env.REACT_APP_GRAPHQL_WEBSOCKET_URL

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  },

});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: hasuraWebSocketUrl,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
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

const GraphQLClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default GraphQLClient


// const GraphQLConfig = {

//     getMessages: (chatId) => {

//         let headers = {
//             'Content-Type': 'application/json',
//             'Authorization': "Bearer " + bearerToken
//         }

//         const options = {
//             headers: headers
//         };

//         let url = ''

//         const operationsDoc = `
//             subscription ChatSubscription {
//                 chats(where: {id: {_eq: "`+chatId+`"}}) {
//                     chat_messages {
//                         id
//                         message
//                         user {
//                             id
//                             first_name
//                             last_name
//                         }
//                     }
//                 }
//             }
//         `

//         let body = {}
//         body.query = operationsDoc;
        
//         return instance.post(url, JSON.stringify(body), options);
//     },
   
// }

// export default GraphQLConfig;

