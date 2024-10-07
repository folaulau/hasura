import React from "react";
import { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Home from "./pages/home";
import SignIn from "./pages/signin";

function PublicRoutes() {

  // Get the current URL
  let currentUrl = window.location.href;

  // Create a URL object from the current URL
  let url = new URL(currentUrl);

  // Split the pathname to get segments
  let pathSegments = url.pathname.split('/');

  // Access the first path segment. Note: The first element is empty if the path starts with '/'
  let firstPathSegment = pathSegments[1];

  useEffect(() => {
    console.log("PublicRoutes isAuthenticated ", Auth.isAuthenticated())
  }, []);

  const getAllRoutes = () => {
    return  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<SignIn />} />  
    </Routes>
  }

  const getRoutes = (signingIn) => {
    if(signingIn){
      return  <div className="col-12 col-sm-12">
        {getAllRoutes()}
      </div>
    }else{
      return  <>
        <div className="col-12 col-sm-2">
          {/* <Navbar/> */}
        </div>
        <div className="col-12 col-sm-10">
          {getAllRoutes()}
        </div>
      </>
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12 pt-3 ps-5 pe-5">
          <div className="row">
            <div className="col-12">
              <Header />
            </div>
          </div>

          <div className="row">
              {
                getRoutes(firstPathSegment==='signin')
              }
          </div>

          <div className="row">
            <div className="col-12">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicRoutes;