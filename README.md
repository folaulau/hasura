# hasura

## Hasura Actions
https://hasura.io/docs/latest/actions/index/

### Redirect Rest API Calls through Hasura
Use Hasura Mutation to redirect Rest API calls to your backend. In this case, our backend is a Springboot application.

1. Use Mutation

a. Create a Mutation
type Mutation {
  userLogin(username: String!, password: String!): UserInfo
}

b. Create a Response Type
type UserInfo {
  accessToken: String!
  userId: Int!
}

c. Check "Forward client headers to webhook" so that Hasura forwards all of the headers to your backend API

d. Change Payload

e. Adjust Permissions to allow your default role to call the Mutation

f. save and query

## How to work with this project:

1. run script to bring up hasura in a docker container

./run-hasura-docker.sh

2. run springboot-api as a Springboot project

3. access hasura portal -> http://localhost:7005/console

4. add hasura metadata

./apply-hasura-metadata.sh

5. play around with hasura

### Custom Query
Subscription is set up on the backend with a chat app but it's not working on the UI. The websocket react piece is the give me problems and is not able to connect to the backend.

### Custom Query
https://hasura.io/blog/using-custom-sql-functions-for-queries-with-postgres-and-graphql-ddca6caf6681/

Custom SQL functions are procedures that you can define which are stored by in database and can be invoked to run on the database and return the final result.

It seems that custom queries won't be able to run as functions in Hasura. Group By specifically did not work with postgres function. The return type is a tricky thing.

View - view is only for static queries. It does not accept parameters to manipulate output.

https://hasura.io/docs/latest/schema/postgres/computed-fields/

Recommendation: use backend api to run complicated queries.

### Subscription with Appollo Client
https://hasura.io/learn/graphql/react/apollo-client/
