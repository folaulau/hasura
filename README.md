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