import React from "react";
import { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Home from "./pages/home";

function PrivateRoutes() {

  useEffect(() => {
  }, []);


  return (
    <>
    <Header /> 
    <div className="row">
      <div className="col-12 col-sm-2">
        {/* <Navbar/> */}
      </div>
      <div className="col-12 col-sm-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<SignIn />} />

            <Route path="*" element={<p>Page not found: 404!</p>} />
          </Routes>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default PrivateRoutes;