// Protects routes by checking user authentication status and redirects accordingly

import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status) //checks the authentication status from store
    console.log("Auth Status: ", authStatus);
    console.log("Authentication: ", authentication);
    //Authentication tells if the route is protected or not
    useEffect(() => {
        if(authentication && !authStatus){
          navigate("/login");
        }
        // if the route is protected and user is not logged in, redirect to login page
        else if(!authentication && authStatus){
          // if the route is protected and user is logged in, redirect to home page
          navigate("/")
        }else setLoader(false);
    },[authStatus,navigate,authentication])
    return (
      !loader? <>{children}</>:<h1>Loading....</h1>
      // This will render the children components if the loader is false, otherwise it will show loading text
    );
}

export default Protected