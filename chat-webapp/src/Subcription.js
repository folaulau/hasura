import React from "react";
import { useEffect, useState } from "react";
import UserApi from "./api/UserApi";
import UserGraphQL from "./graphql/UserGraphQL";

function Subscription() {

  let apiToken = process.env.REACT_APP_API_TOKEN

  const [userInfo, setUserInfo] = useState({"firstName":"", "lastName":""})

  useEffect(() => {

    console.log("Subscription apiToken, ", apiToken)

    UserGraphQL.getUserDetails().then((response) => {
      console.log("response: ", response);
    }).catch((error) => {
      console.error("Error: ", error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">

        <div className="row">
          <div className="col-12">
            <h1>Hasura Chat</h1>

            {/* <ChatMessages /> */}
           
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h5>Hello {userInfo.firstName} {userInfo.lastName}</h5>

            {/* <ChatMessages /> */}
           
          </div>
        </div>


        </div>
      </div>
    </div>
  );
}

export default Subscription;