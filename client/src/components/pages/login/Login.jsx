import { Context } from "../../../context/Context";
import "./login.css";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as React from 'react'

import MuiAlert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';


// import CircularProgress from '@mui/material/CircularProgress';
import { axiosInstance } from "../../../config";
import { SocialBaseUrl } from "../../../shareBaseUrl";

// import {GoogleLogin} from 'react-google-login';

// import "./../../../config/firebase-config"

// import firebase from 'firebase';
// import 'firebase/auth';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { async } from "@firebase/util";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("")
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkBox, setCheckBox] = useState(false)


  const onCheckBoxChange = async(e)=>{
    if(e.target.checked === true){
      setCheckBox(true)
    }else{
      setCheckBox(false)
    }
  }

  const google = async () => {
    var url = SocialBaseUrl+ "auth/google"
    window.open(url, "_self");
  };

  const facebook = () => {
     var url = SocialBaseUrl+ "auth/facebook"
    window.open(url, "_self");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if(userRef.current.value==="" || passwordRef.current.value===""){
      setError(true);
      setOpen(true);
      setErrorMsg("Username and password cannot be empty!")
    }else if(checkBox === false){
      setErrorMsg('Please check The box');
      setOpen(true);
      setError(true)
    }else{
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axiosInstance.post("/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        if(res.data.email){
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }else{
          setError(true);
          setOpen(true);
          setErrorMsg(res.data.message);
          dispatch({ type: "LOGIN_FAILURE" });
        }  
      } catch (err) {
        setError(true);
        setOpen(true);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
  };
  


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="loginBody">
      <div className="login">
        <div className="loginWrapper">
        <img src="https://images.pexels.com/photos/4359106/pexels-photo-4359106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span className="loginTitle">
            <p>BUDVISTA</p>
            <div className="txtTitle">
            <p>Welcome back</p></div>
          </span>
          <form className="loginForm" onSubmit={handleSubmit}>

            <Box className="loginInput" >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                type="text"
                id="input-with-sx"
                label="Username"
                variant="standard"
                inputRef={userRef}
              />
            </Box>
            <Box className="loginInput">
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Password"
                variant="standard"
                inputRef={passwordRef}
              />
            </Box>
            

            <div className="loginRmb">
              <input className="loginCheckbox" onClick = {onCheckBoxChange} type="checkbox" />
              <p>Remember me</p>
            </div>

            <Button className="loginButton" variant="contained" color="primary" type="submit" disabled={isFetching}>
            <LoginIcon sx={{  mr: 1, my: 0.5 }} style={{ color: "white" }} />
              Login
            </Button>



            <Button className="googleLoginButton" onClick = {google } variant="contained">
              <GoogleIcon sx={{  mr: 1, my: 0.5 }} style={{ color: "white" }} />
              Login with Google
            </Button>

            <Button className="facebookLoginButton" onClick = {facebook } color="primary" variant="contained">
              <FacebookIcon sx={{  mr: 1, my: 0.5 }} style={{ color: "white" }} />
              Login with Facebook
            </Button>

           
            {/* <Button className="loginButton" variant="contained" color="primary" type="submit" disabled={isFetching}>
              Login
            </Button> */}
          
            {/* <GoogleLogin
              clientId="129289860315-qocc56lfam2s27phga02bjd239js8ifh.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={'single_host_origin'}
            />, */}
            

            {/* <Button className="loginButton" variant="contained" onClick = {loginWithGoogle} color="primary"  disabled={isFetching}>
            Login With Google
            </Button> */}

{/*             
              <Button className="loginGoogle" onCLick={test}  variant="contained" color="primary" >
                Login With Google
              </Button> */}

           
            <p className="txt">or</p>
            <div className="toRegister">
              Not a member ?
            <Link to="/register">
              <p>Sign up now</p>
            </Link>
              </div>
          </form>
          {error &&
              <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
         <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {/* Wrong username / password */}
                {errorMsg}
              </Alert>
              
        </Snackbar>
        
            }
        </div>
      </div>
    </div>
  );
}
