import React from "react";
import Sideprofile from "../../sideprofile/Sideprofile";
import "./createshop.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArticleIcon from "@mui/icons-material/Article";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../context/Context";
import { axiosInstance } from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PicBaseUrl } from "../../../imageBaseUrl";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Createshop() {
  const [shopTitle, setShopTitle] = useState("");
  const [button, setButton] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Youtube, setYoutube] = useState("");
  const [Grab, setGrab] = useState("");
  const [Lineman, setLineman] = useState("");
  const [Robinhood, setRobinhood] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [shop, setShop] = useState ([]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkboxItems, setCheckboxItems] = useState([]);
 
  const handleCheckboxChange = async(e)=>{
    if(e.target.checked){
      setCheckboxItems([...checkboxItems, e.target.value])
      }
      if(!e.target.checked){
        const updatedSelectedTopics = checkboxItems.filter(
          (selectedTopic) => selectedTopic !== e.target.value
        );
        setCheckboxItems(updatedSelectedTopics);
      }
    }

  
  // ================================================
  // =================Week Day=======================
  // ================================================

  const [schedule1, setSchedule1] = useState([]);
  const [schedule2, setSchedule2] = useState([]);
  const [schedule3, setSchedule3] = useState([]);
  let scheduleData = []

  const weekdays = [
    {
      value: "Monday",
      label: "Monday",
    },
    {
      value: "Tuesday",
      label: "Tuesday",
    },
    {
      value: "Wednesday",
      label: "Wednesday",
    },
    {
      value: "Thursday",
      label: "Thursday",
    },
    {
      value: "Friday",
      label: "Friday",
    },
    {
      value: "Saturday",
      label: "Saturday",
    },
    {
      value: "Sunday",
      label: "Sunday",
    },
  
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!file || !shopTitle || !shopDesc || !telephone || !address){
      setOpen(true)
      setError(true)
      setErrorMsg("Please fill all the details in the form!")
    }else{
    const newShop = {
      username:user.username,
      shopTitle,
      shopDesc,
      telephone,
      address,
      instagram:Instagram,
      facebook: Facebook,
      twitter:Twitter,
      youtube:Youtube,
      grab:Grab,
      lineman:Lineman,
      robinhood:Robinhood,
      timings:[schedule1,schedule2,schedule3],
      categories:checkboxItems
    };
    if (file) {
      if(file.size > 15728640){
        setOpen(true)
        setError(true)
        setErrorMsg("Please upload a file smaller than 15 MB!")
        return false;
      }
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newShop.coverPhoto = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
      }
    }
    try {
      const res = await axiosInstance.post("/shops", newShop);
      setSuccess(true);
      setOpen(true)
    } catch (err) {

    }
  }
  };
  // update function============================================
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    const newShop = {
      username:user.username,
      shopTitle,
      shopDesc,
      telephone,
      address,
      instagram:Instagram,
      facebook: Facebook,
      twitter:Twitter,
      youtube:Youtube,
      grab:Grab,
      lineman:Lineman,
      robinhood:Robinhood,
      timings:[schedule1,schedule2,schedule3],
      categories:checkboxItems
    };
    if (file) {
      if(file.size > 15728640){
        setOpen(true)
        setError(true)
        setErrorMsg("Please upload a file smaller than 15 MB!")
        return false;
      }

      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newShop.coverPhoto = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
      }
    }
    try {
      const res = await axiosInstance.put("/shops/"+ user.username, newShop);
      setSuccess(true);
      // window.location.replace("/shop/" + res.data.username);
    } catch (err) {

    }
  };

  // =======================This function creates a new drop down for day an time

  // =======================This function creates a new drop down for day an time


  useEffect(() => {
    const getShop = async () => {
      const res = await axiosInstance.get('/shops/' +user.username)
      if(res.data[0]){
        setButton("Update")
        setShop(res.data[0])
        setShopTitle(res.data[0].shopTitle)
        setShopDesc(res.data[0].shopDesc)
        setTelephone(res.data[0].telephone)
        setAddress(res.data[0].address)
        // setFile(res.data[0].coverPhoto)
        setInstagram(res.data[0].instagram)
        setFacebook(res.data[0].facebook)
        setTwitter(res.data[0].twitter)
        setYoutube(res.data[0].youtube)
        setGrab(res.data[0].grab)
        setLineman(res.data[0].lineman)
        setRobinhood(res.data[0].robinhood)
        setSchedule1(res.data[0].timings[0])
        setSchedule2(res.data[0].timings[1])
        setSchedule3(res.data[0].timings[2])
        setCheckboxItems(res.data[0].categories)
      }
    };
    getShop()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();

  },[]);

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
  <div className="shopinfo">
    <div className="shopwrapper">
      <div className="shopBody">
        <div className="shopHeading">
          <span className="shopUpdateTitle">
            <h1>Create shop</h1>
          </span>
        </div>
        <form action="" className="shopForm" onSubmit={button ? handleUpdateSubmit : handleSubmit}>
          <div className="shopPp">
            <img
            src={file ? URL.createObjectURL(file) : shop.coverPhoto==null ? PicBaseUrl+"noPreview.png" : PicBaseUrl+ shop.coverPhoto}
              alt=""
            />
            <label htmlFor="fileInput">
              <i class="shopPpIcon fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="shopFormBody">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="standard-multiline-flexible"
                placeholder="Shop title"
                multiline
                maxRows={4}
                variant="standard"
                type="text"
                value={shopTitle}
                onChange={(e) => setShopTitle(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ArticleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }}/>
              <TextField
                fullWidth
                sx={{ mt: 2, width: "60%", height: "50p%" }}
                id="standard-multiline-flexible"
                placeholder="Shop Description"
                multiline
                maxRows={4}
                variant="standard"
                type="text"
                value={shopDesc}
                onChange={(e) => setShopDesc(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Contact number"
                variant="standard"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PlaceIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Shop Address"
                variant="standard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <InstagramIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Instagram Url"
                variant="standard"
                value={Instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FacebookIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Facebook Url"
                variant="standard"
                value={Facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TwitterIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Twitter Url"
                variant="standard"
                value={Twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <YouTubeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Youtube Url"
                variant="standard"
                value={Youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <InsertPhotoIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Grab URL"
                variant="standard"
                value={Grab}
                onChange={(e) => setGrab(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <InsertPhotoIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Lineman URL"
                variant="standard"
                value={Lineman}
                onChange={(e) => setLineman(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <InsertPhotoIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ mt: 2, width: "60%", height: "50%" }}
                id="input-with-sx"
                placeholder="Robinhood URL"
                variant="standard"
                value={Robinhood}
                onChange={(e) => setRobinhood(e.target.value)}
              />
            </Box> */}
           <div className="catlabel">
              <label>Category</label>
              <div className="checkcategory">              
                {categories.map((check) => (
                  <div className="checkRmb">
                    <input className="catCheckbox" value= {check.name}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkboxItems.includes(check.name)? true: false}
                    />
                    <p>{check.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="Weekdays">
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              select
              label="From"
              value={ schedule1.dayFrom == undefined ? '' : schedule1.dayFrom}
              onChange={(e) => {
                scheduleData.dayFrom = e.target.value
                setSchedule1({...schedule1, ...scheduleData})
              }}
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule1.dayTo == undefined ? '' : schedule1.dayTo}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule1({...schedule1, ...scheduleData})
              }}
              // helperText="Please select your Opening day"
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule1.timeFrom == undefined ? '' : schedule1.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule1({...schedule1, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
            <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput 
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule1.timeTo == undefined ? '' : schedule1.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule1({...schedule1, ...scheduleData})
                }}
              />
            </FormControl>
          </div>
          <div className="Weekdays">
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              select
              label="From"
              value={schedule2.dayFrom == undefined ? '' : schedule2.dayFrom}
              onChange={(e) => {
                scheduleData.dayFrom = e.target.value
                setSchedule2({...schedule2, ...scheduleData})
              }}
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule2.dayTo == undefined ? '' : schedule2.dayTo}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule2({...schedule2, ...scheduleData})
              }}
              // helperText="Please select your Opening day"
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule2.timeFrom == undefined ? '' : schedule2.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule2({...schedule2, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule2.timeTo == undefined ? '' : schedule2.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule2({...schedule2, ...scheduleData})
                }}
              />
            </FormControl>
          </div>
          <div className="Weekdays">
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              select
              label="From"
              value={schedule3.dayFrom == undefined ? '' : schedule3.dayFrom}
              onChange={(e) => {
                scheduleData.dayFrom = e.target.value
                setSchedule3({...schedule3, ...scheduleData})
              }}
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule3.dayTo == undefined ? '' : schedule3.dayTo}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule3({...schedule3, ...scheduleData})
              }}
              // helperText="Please select your Opening day"
            >
              {weekdays.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule3.timeFrom == undefined ? '' : schedule3.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule3({...schedule3, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule3.timeTo == undefined ? '' : schedule3.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule3({...schedule3, ...scheduleData})
                }}
              />
            </FormControl>
          </div>
          </div>
          <button className="shopSubmit" type="submit">
          {button ?"Update" :"Create"}
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
                Shop Created !
              </Alert>
            </Snackbar>
          )}
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
              {/ Register failed, Username has already been used /}
              {errorMsg}
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