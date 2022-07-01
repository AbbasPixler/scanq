import React from "react";
import "./editproduct.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SideProfile from "../../sideprofile/Sideprofile";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";
import { axiosInstance } from "../../../config";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PicBaseUrl } from "../../../imageBaseUrl";
import PercentIcon from '@mui/icons-material/Percent';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from "@mui/material/Box";
// import { pink } from "@material-ui/core/colors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Editproduct() {
  const location = useLocation()
  const path = (location.pathname.split("/")[2])
  const [title, setTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState ("")
  const [file, setFile] = useState(null);
  const [image, setImage] = useState ([]);
  const { user } = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [productCategories, setProdductCategories] = useState([]);
  const [THCPercent, setTHCPercent] = useState("");
  const [CBDPercent, setCBDPercent] = useState("");
  const [productType, setProductType] = useState("");
  const [strainType, setStrainType] = useState("");
  const [flavourType, setflavourType] = useState([]);
  const [effectType, setEffectType] = useState([]);
  const [recommended, setRecommended] = useState();

  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const productTypeArray = [
    "Flower",
    "Pre-rolls",
    "Edibles",
    "Accessories",
    "Food",
    "Drink",
    "Others"
    ]

    const strainTypeArray = [
      "Savita",
    "Hybrid",
    "Indica"
    ]
    const effectTypeArray = [
      "Happy",
      "Creative",
      "Euphoria",
      "Relaxed",
      "Sleep",
      "Stone",
      "Talkative",
      "Focused",
      "Hungry",
      "Uplifting",
      "Energizing",
      "Sociable"

    ]

    const flavourTypeArray = [
      "Herbal",
      "Earthy",
      "Citrus",
      "Vanilla",
      "Mint",
      "Lemon",
      "Pine",
      "Sweet",
      "Spicy",
      "Woody",
      "Nutty",
      "Grape",
      "Fruity",
      "Berry",
      "Menthol"

    ]


  const [values, setValues] = React.useState({
    amount: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [category, setCategory] = React.useState("THB");
  
  const handleFlavourChange = (e)=>{
    setflavourType(e.target.value)
  }
  const handleEffectChange = (e)=>{
    setEffectType(e.target.value)
  }
  const onCheckBoxChange = (e)=>{
    setRecommended(e.target.checked)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    var effectString = "";
    effectType.map((effect)=>{
      if(effectString.length < 1){
        effectString = effect
      }else{
        effectString += "_"+effect;
      }
    })

    var flavourString = "";
    flavourType.map((flavour)=>{
      if(flavourString.length < 1){
        flavourString = flavour
      }else{
        flavourString += "_"+flavour;
      }
    })
    const newProduct = {
      username: user.username,
      title,
      productDesc,
      price,
      category,
      CBD: CBDPercent,
      THC: THCPercent,
      strainType,
      productType,
      flavourType: flavourString,
      effectType: effectString,
      recommended
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
      const res = axiosInstance.put("/products/" + path, newProduct);
      setOpen(true)
      setSuccess(true);
    } catch (err) {
      
    }
  // }
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
    const getShop = async () => {
      const res = await axiosInstance.get('/products/getProductById/' + path)
        setTitle(res.data.title)
        setProductDesc(res.data.productDesc);
        setPrice(res.data.price);
        setCategory(res.data.category);
        setImage(res.data)
        setTHCPercent(res.data.THC)
        setCBDPercent(res.data.CBD)
        setProductType(res.data.productType)
        setStrainType(res.data.strainType)
        // setflavourType(res.data.flavourType)
        // setEffectType(res.data.effectType)
        setRecommended(res.data.recommended)
      

        const flavourArray = res.data.flavourType.split("_");
        const effectArray = res.data.effectType.split("_");
        console.log(res.data.strainType)
        
        setflavourType(flavourArray)
        setEffectType(effectArray)
    };
    getShop()
  }, [path])

  useEffect(() => {
    const fetchProductCategories = async () => {
      const res = await axiosInstance.get("/product_categories/" + user.username);
      setProdductCategories(res.data);
    };
    fetchProductCategories();
  },[]);

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
    <div className="editproduct">
      <div className="editproductWrapper">
        <div className="editproductBody">
          <div className="editproductTitle">
            <h1>Edit Product</h1>
          </div>
          <form action="" className="editproductForm" onSubmit={handleUpdateSubmit} encType="multipart/form-data">
            <div className="productImg">
              <img src={file ? URL.createObjectURL(file) : PicBaseUrl + image.productImage} alt="" />
            <label htmlFor="fileInput">
              <i class="addProductImg fa-solid fa-plus">
              </i>
            </label>
                <input type="file" id="fileInput" style = {{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/></div>
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
              sx={{ mt: 4, width: "100%", height: "120px"}}
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows={4}
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
              <TextField
                fullWidth
                sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
                id="outlined-select-productCategories"
                select
                label="Select product type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                {productTypeArray.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
                id="outlined-select-productCategories"
                select
                label="Select strain type"
                value={strainType}
                onChange={(e) => setStrainType(e.target.value)}
              >
                {strainTypeArray.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            <TextField
              fullWidth
              sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>
              <TextField
                fullWidth
                sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
                id="outlined-select-productCategories"
                select
                label="Select product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {/* Percentage of Cannabis */}
              <TextField
              fullWidth
              sx={{ mt: 12, width: "40%", height: "50px", p: 1 }}
              id="outlined-basic"
              label="CBD"
              variant="outlined"
              value={CBDPercent}
              onChange={(e) => setCBDPercent(e.target.value)}
              >
              <span><PercentIcon fontSize="small"/></span>
              </TextField>
              <TextField
              fullWidth
              sx={{ mt: 12, width: "40%", height: "50px", p: 1  }}
              id="outlined-basic"
              label="THC"
              variant="outlined"
              value={THCPercent}
              onChange={(e) => setTHCPercent(e.target.value)}
            ></TextField>
        <FormControl sx={{ mt: 4, width: "40%"  }}>
        <InputLabel id="demo-multiple-chip-label">Product Effect</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={effectType}
          onChange={handleEffectChange}
          input={<OutlinedInput id="select-multiple-chip" label="Product Effect" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {effectTypeArray.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl sx={{ mt: 3.5,  width: "40%" }}>
        <InputLabel id="demo-multiple-chip-label">Product Flavour</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={flavourType}
          onChange={handleFlavourChange}
          input={<OutlinedInput id="select-multiple-chip" label="Product Flavour" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {flavourTypeArray.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>

    <div className="loginRmb">
              <input className="loginCheckbox" onClick = {onCheckBoxChange} type="checkbox" checked={recommended? true: false}/>
              <p><strong>Add recommended tag to this product!</strong></p>
            </div>
            
            <div className="editproductBtn">
              <Button className="" variant="outlined" color="primary">
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update product
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
                  Product updated !
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