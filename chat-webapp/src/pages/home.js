
import React from "react";
import { useEffect, useState } from "react";
import UserApi from "../api/userApi";
import Auth from "../components/Auth";

function Home() {

  useEffect(() => {
    console.log("Home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-4 offset-sm-4 mt-5">
        <h1>Welcome Home!</h1>
        </div>
      </div>
    </>
  );
}

export default Home;