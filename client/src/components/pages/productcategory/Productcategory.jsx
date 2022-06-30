import React from "react";
import "./productcategory.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SideProfile from "../../sideprofile/Sideprofile";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import { axiosInstance } from "../../../config";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Productcategory() {
  const [title, setTitle] = useState("");
  const { user } = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isShop, setIsShop] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title){
      setOpen(true)
      setError(true)
      setErrorMsg("Please fill the detail in the form!")
    }else if(isShop == true){
      const newProduct = {
        username: user.username,
        name:title
      };
    
     try {
      const res = axiosInstance.post("/product_categories", newProduct);
      console.log(res)
      setOpen(true)
      setSuccess(true);
      setTitle("");
      } catch (err) {
          
      }
    }else{
      setOpen(true)
      setError(true)
      setErrorMsg("Please Create a shop First!")
    }
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setSuccess(false);
    setOpen(false)
    setError(false)
  };

  useEffect(() => {
    const fetchShopByUser = async () => {
      const res = await axiosInstance.get("/shops/" + user.username)
      if(res.data[0] == undefined){
        setIsShop(false)
      }else{
        setIsShop(true)
      }
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
    <div className="addproductCategory">
      <div className="addproductCatWrapper">
        <div className="addproductCatBody">
          <div className="addproductCatTitle">
            <h1>Create Product Category</h1>
          </div>
          <form action="" className="addproductCatForm" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ mt: 2, width: "100%", height: "50px" }}
              id="outlined-basic"
              label="Product category name"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
            
            <div className="addproductCatBtn">
              {/* <Button className="" variant="outlined" color="primary">
                Back
              </Button> */}
              <Button variant="contained" color="primary" type="submit">
                Add product category
              </Button>
            </div>
            {success && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Product Category added !
                </Alert>
              </Snackbar>
            )}
            {error && (
            <Snackbar
              open={open}
              autoHideDuration={20000}
              onClose={handleClose}
              action={action}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMsg}
              </Alert>
            </Snackbar>
          )}
          </form>
        </div>
      </div>
      <SideProfile />
    </div>
  );
}