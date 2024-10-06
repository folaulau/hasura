
import React from "react";
import { useEffect, useState } from "react";
import UserApi from "../api/userApi";
import Auth from "../components/Auth";

function SignIn() {

  const [userInfo, setUserInfo] = useState({"id":0});
   
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a function to handle the form submission
  
  const handleInputChange = (e) => {
    setUserInfo(userInfo => ({
      ...userInfo,
      [e.target.name]: e.target.value,
    }))
  }

  const signInWithEmailAndPassword = () => {
    console.log(userInfo)

    UserApi.login(userInfo.id).then((response) => {
      console.log("response: ", response);

      Auth.signIn(response.data);

      window.location.href = "/";
      
    }).catch((error) => {
      console.error("Error msg: ", error.message);
      console.error("Error: ", error);
      if(error.response.data){
        setErrorMsg(error.response.data.message)
      }else{
        setErrorMsg(error.message+". Server may be down")
      }
      
    });

  };


  return (
    <>
      <div className="row">
        <div className="col-sm-4 offset-sm-4 mt-5">
          <form>
            <h1 className="h3 mb-3 fw-normal">Sign In</h1>
            <div className='row'>
              <div className="col-12 col-md-12">
                {
                  errorMsg && 
                  <div className="alert alert-danger">
                    {errorMsg}
                  </div>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="form-floating">
                  <input 
                  type="text" 
                  className="form-control"
                  autoComplete="id"
                  name="id"
                  value={userInfo.id}
                  onChange={handleInputChange}
                  required
                  />
                  <label>User ID</label>
                </div>
              </div>
            </div>
            <button onClick={()=>signInWithEmailAndPassword()} className="btn btn-primary w-100 py-2" type="button">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;