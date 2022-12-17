import logo from './logo.svg';
import './App.css';
import React from "react";
import { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import GraphQL from './graphql/graphql'
import UserApi from './api/userApi';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {

  // let query = useQuery();

  const[chatId, setChatId] = useState(1)


  useEffect(() => {
    console.log("chatId: "+chatId)
    // const interval = setInterval(() => {
    //   loadData()
    // }, 2000);
    // return () => clearInterval(interval);

    UserApi.login(1)
    .then((response)=>{
      console.log("login, ", response.data)
      let data = response.data

      localStorage.setItem("authToken", data.token)

      loadChatMessages()

    })
    .catch((error)=>{
        console.log("error, ", error.response.data)
    });

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadChatMessages = () => {
    console.log("loadChatMessages - chat id: "+chatId)
    GraphQL.getChatMessages(chatId)
    .then((response)=>{
      console.log("messages, ", response.data)
      let data = response.data

    })
    .catch((error)=>{
        console.log("error, ", error.response.data)
    });
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">

        <div className="row">
          <div className="col-12">
            <h1>Chat</h1>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
