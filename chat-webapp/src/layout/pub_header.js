import './Header.css';
import React from 'react';
import { useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth';
import { useLocation } from 'react-router-dom';



function PublicHeader() {

  // const navigate = useNavigate();

  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';

  const tabs = [
      {
        name: 'Indicators',
        urlSlug : 'indicators',
        sidebar: 'indicator',
        highlight: firstSegment==="indicators"
      },
      {
        name: 'Strategies',
        urlSlug : 'strategies',
        sidebar: 'strategy',
        highlight: firstSegment==="strategies"
      },
      {
        name: 'Charts',
        urlSlug : 'chart-patterns',
        sidebar: 'chart-pattern',
        highlight: firstSegment==="chart-patterns"
      },
      {
        name: 'Sign In',
        urlSlug : 'signin',
        sidebar: '',
        highlight: firstSegment==="signin"
      }
  ]

  useEffect(() => {
    Auth.signOut()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const signIn = () => {
  //   console.log("go to sign in")
  //   navigate('/signin');
  // }

  const goTo = (urlSlug, sidebar) => {
    // navigate("/"+urlSlug+"?sidebar="+sidebar)
    window.location.href = "/"+urlSlug+"?sidebar="+sidebar;
  }

  return (
    <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4">My Trading Engine</span>
            </a>

            <nav className="d-inline-flex mt-1 mt-sm-0 ms-sm-auto d-grid gap-1">

                {
                  tabs.map((tab)=>(
                    <button key={tab.name}
                      onClick={()=>goTo(tab.urlSlug, tab.sidebar)}
                      type='button'
                      className={`btn btn-outline-primary btn-sm ${tab.highlight ? 'active' : ''}`}
                      >
                        {tab.name}
                      </button>
                  ))
                }
                
         
            </nav>
        </div>
    </header>
  );
}

export default PublicHeader;
