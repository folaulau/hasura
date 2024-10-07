import React from 'react';
import { useState , useEffect} from "react";

function Footer() {

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("PublicFooter");
    setErrorMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div className="row">
        <div className="col-12">
          <div className='row mt-5'>
            <div className="col-12 col-md-4">
            {
              errorMsg && 
              <div className="alert alert-danger">
                {errorMsg}
              </div>
            }
            </div>
          </div>
          <div className='row mt-1'>
            <div className="col-12 col-sm-12">
            {/* <FooterLinks /> */}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Footer;
