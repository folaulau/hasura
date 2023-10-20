import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
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
                    last_name
                    first_name
                    phone_number
                    updated_at
                    user_type
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