import "./blog.css";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import Container from "@material-ui/core/Container";

import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';
import * as React from 'react'
import { axiosInstance } from "../../../config";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { maxWidth } from "@mui/system";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Blog() {
  const [title, setTItle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isShop, setIsShop] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if(isShop == true){
      console.log("Yes")
      const newPost = {
        username: user.username,
        title,
        desc,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        setSuccess(true);
        setOpen(true);
        try {
          await axiosInstance.post("/upload", data);
        } catch (err) {}
      }
      try {
        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {
      }
    }else{
      console.log("No")
      setOpen(true)
      setError(true)
      setErrorMsg("Please Create a shop First!")
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const uploadImageCallBack = async() =>{
    const data = new FormData();
    data.append('image', file);
  }

  useEffect(() => {
    const fetchShopByUser = async () => {
      // console.log(user.username)
      const res = await axiosInstance.get("/shops/" + user.username)
      if(res.data[0] == undefined){
        setIsShop(false)
      }else{
        setIsShop(true)
      }
      // set(res.data)
    }
    fetchShopByUser();
  },[])

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
    <Container className="blog">
      <div>
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
      </div>
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Add your event here"
            className="writeInput writeTitle"
            autoFocus={true}
            onChange={(e) => setTItle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '300px', maxWidth:'1000px' }}>
           <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbar={{
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
              }}
              onChange= {(e) => setDesc(editorState.getCurrentContent().getPlainText())}
           />
          </div>
        </div>


        <button className="writeSubmit" type="submit">
          Publish
          {success &&
              <Snackbar
        open={open}
        autoHideDuration={20000}
        onClose={handleClose}
        action={action}
      >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Post created !
        </Alert>
        </Snackbar>
            }
            {error && (
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              action={action}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {/* Register failed, Username has already been used */}
                {errorMsg}
              </Alert>
            </Snackbar>
          )}
        </button>
      </form>
    </Container>
  );
}


