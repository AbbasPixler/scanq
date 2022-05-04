import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import Sideprofile from "../../sideprofile/Sideprofile";
import "./profileinfo.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { axiosInstance } from "../../../config";
import { PicBaseUrl } from "../../../imageBaseUrl";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Profileinfo() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username: user.username,
      email: user.email,
      password,
    };
    
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  return (
    <div className="profileinfo">
      <div className="profilewrapper">
        <div className="profileBody">
          <div className="profileTitle">
            <span className="profileUpdateTitle">
              <h1>Profile Info</h1>
            </span>
          </div>
          <form className="profileForm" onSubmit={handleSubmit}>
            <div className="profilePp">
              <img
                src={file ? URL.createObjectURL(file) :  user.profilePic == "" ?  PicBaseUrl+"noPreview.png" : PicBaseUrl + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i class="profilePpIcon fa-solid fa-plus"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
              fullWidth
              sx={{ mt: 2, width: "50%", height: "50p%" }}
                id="input-with-sx"
                label="Username"
                variant="standard"
                type="text"
                value={user.username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
              fullWidth
              sx={{ mt: 2, width: "50%", height: "50p%" }}
                id="input-with-sx"
                label="Email"
                variant="standard"
                type="email"
                value={user.email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
              fullWidth
              sx={{ mt: 2, width: "50%", height: "50p%" }}
                id="input-with-sx"
                label="Password"
                variant="standard"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  sx={{ mt: 2, width: "50%", height: "50%" }}
                  id="input-with-sx"
                  label="Contact number"
                  variant="standard"
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </Box> */}

            {/*      <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            /> 
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
  />
                        <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
  */}

            <button className="profileSubmit" type="submit">
              Update
            </button>
            {success && (
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Profile updated !
                </Alert>
              </Snackbar>
            )}
          </form>
        </div>
      </div>
      <Sideprofile />
    </div>
  );
}