import React from "react";
import "./addproduct.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SideProfile from "../../sideprofile/Sideprofile";
import { useState, useContext } from "react";
import { Context } from "../../../context/Context";
import { axiosInstance } from "../../../config";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const categories = [
  {
    value: "Top Pick",
    label: "Top Pick",
  },
  {
    value: "Favourite",
    label: "Favourite",
  },
  {
    value: "Recommended",
    label: "Recommended",
  },
  {
    value: "New Menu",
    label: "New Menu",
  },
  {
    value: "Special",
    label: "Special",
  },

];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Addproduct() {
  const [title, setTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState ("")
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [category, setCategory] = React.useState("THB");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!file || !title || !productDesc || !price || !category){
      console.log("please fill the form")
      setOpen(true)
      setError(true)
      setErrorMsg("Please fill all the details in the form!")
    }else{
    const newProduct = {
      username: user.username,
      title,
      productDesc,
      price,
      category,
    };
    
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newProduct.productImage = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = axiosInstance.post("/products", newProduct);
      console.log(res)
      setSuccess(true);
      setTitle("");
      setProductDesc("");
      setFile(null);
      setPrice("");
      setCategory("TBH");
    } catch (err) {
      
    }
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
    <div className="addproduct">
      <div className="addproductWrapper">
        <div className="addproductBody">
          <div className="addproductTitle">
            <h1>Create Product</h1>
          </div>
          <form action="" className="addproductForm" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="productImg">
              {file &&
              <img src={URL.createObjectURL(file)} alt="" />
              }
            <label htmlFor="fileInput">
              <i class="addProductImg fa-solid fa-plus">
              </i>
            </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/></div>
            <TextField
              fullWidth
              sx={{ mt: 2, width: "100%", height: "50px" }}
              id="outlined-basic"
              label="Product name"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              sx={{ mt: 2, width: "100%", height: "120px" }}
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows={4}
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
            <TextField
              fullWidth
              sx={{ mt: 2, width: "40%", height: "50px" }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>

            <div className="productPriceCat">
              <TextField
                fullWidth
                sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
                id="outlined-select-productCategories"
                select
                label="Select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                helperText="Please select your product category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            
            <div className="addproductBtn">
              <Button className="" variant="outlined" color="primary">
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add product
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
                  Product added !
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
                {/* Register failed, Username has already been used */}
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