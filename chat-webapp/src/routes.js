import React from "react";
import { useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./components/Auth";
import PublicRoutes from "./public_routes";
import ProtectedRoutes from "./private_routes";

function Routes() {

  useEffect(() => {
    console.log("isAuthenticated ", Auth.isAuthenticated())
  }, []);

  return (
    <>
      <div className="me-1 ms-1 me-sm-4 ms-sm-4"> 
        <div className="row">
          <div className="col-12">
            <Router>
              {
                Auth.isAuthenticated() 
                
                ? 
                
                <ProtectedRoutes />

                : 
                
                <PublicRoutes />
              }
            </Router>
          </div>
        </div>
      </div>
    </>
  );
}

export default Routes;