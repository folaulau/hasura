import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const UserApi = {

    login: (userId) => {

        let headers = {
            'Content-Type': 'application/json'
        }

        const options = {
            headers: headers
        };

        let url = '/users/login'

        let body = {
            'userId': userId
        }
        
        return instance.post(url, JSON.stringify(body), options);
    }
}

export default UserApi;