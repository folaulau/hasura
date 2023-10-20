import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_GRAPHQL_URL
});

var bearerToken = process.env.REACT_APP_API_TOKEN

const MessageGraphQL = {

    getMessages: (chatId) => {

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + bearerToken
        }

        const options = {
            headers: headers
        };

        let url = ''

        const operationsDoc = `
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
        `

        let body = {}
        body.query = operationsDoc;
        
        return instance.post(url, JSON.stringify(body), options);
    },
   
}

export default MessageGraphQL;