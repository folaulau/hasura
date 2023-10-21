import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL+"/v1/graphql"
});

var bearerToken = process.env.REACT_APP_API_TOKEN

const UserGraphQL = {

    getUserDetails: () => {

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + bearerToken
        }

        const options = {
            headers: headers
        };

        let url = ''

        const operationsDoc = `
            query GetUserInfo {
                users {
                    id
                    lastName: last_name
                    firstName: first_name
                    phoneNumber: phone_number
                    updated_at
                    userType: user_type
                    uuid
                    email
                    dob
                    created_at
                }
            }
        `

        let body = {}
        body.query = operationsDoc;
        
        return instance.post(url, JSON.stringify(body), options);
    },
   
}

export default UserGraphQL;