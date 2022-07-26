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
import GoogleMap from './GoogleMaps';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { height } from "@mui/system";

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
  // ===================Week Day=====================
  // ================================================

  const [schedule1, setSchedule1] = useState([]);
  const [schedule2, setSchedule2] = useState([]);
  const [schedule3, setSchedule3] = useState([]);
  const [schedule4, setSchedule4] = useState([]);
  const [schedule5, setSchedule5] = useState([]);
  const [schedule6, setSchedule6] = useState([]);
  const [schedule7, setSchedule7] = useState([]);
  let scheduleData = []
  
  let day1 = []
  let day2 = []
  let day3 = []
  let day4 = []
  let day5 = []
  let day6 = []
  let day7 = []
  
  day1.day = "Monday"
  day2.day = "Tuesday"
  day3.day = "Wednesday"
  day4.day = "Thursday"
  day5.day = "Friday"
  day6.day = "Saturday"
  day7.day = "Sunday"


 

 

  const shopStatus = [
    {
      value: "Closed",
      label: "Closed",
    },
    {
      value: "Enter Hours",
      label: "Enter Hours",
    }
  ];

  //=================Shop Timings Diabled============================ 
  //=================Shop Timings Diabled============================ 
  //=================Shop Timings Diabled============================ 

  const[MondayTimingDisabled, setMondayTimingDisabled] = useState(true)
  const[TuesdayTimingDisabled, setTuesdayTimingDisabled] = useState(true)
  const[WednesdayTimingDisabled, setWednesdayTimingDisabled] = useState(true)
  const[ThursdayTimingDisabled, setThursdayTimingDisabled] = useState(true)
  const[FridayTimingDisabled, setFridayTimingDisabled] = useState(true)
  const[SaturdayTimingDisabled, setSaturdayTimingDisabled] = useState(true)
  const[SundayTimingDisabled, setSundayTimingDisabled] = useState(true)


  // ================================================================

  // ================================================================
  // =====================Google Maps States=========================
  // ================================================================

  const[mapAddress, setMapAddress] = useState("")
  const[showingInfoWindow, setShowingInfoWindow] = useState(false)
  const[activeMarker, setActiveMarker] = useState([])
  const[selectedPlace, setSelectedPlace] = useState([])
  const[mapCenter, setMapCenter] = useState([])
  const[coordinates, setCoordinates] =useState({})

  
// console.log("coordinates :-",coordinates.length)

  // ================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSchedule1({...schedule1, ...day1})
    setSchedule2({...schedule2, ...day2})
    setSchedule3({...schedule3, ...day3})
    setSchedule4({...schedule4, ...day4})
    setSchedule5({...schedule5, ...day5})
    setSchedule6({...schedule6, ...day6})
    setSchedule7({...schedule7, ...day7})
    // console.log(shopTitle)
    // console.log(shopDesc)
    // console.log(telephone)
    // console.log(address)
    // console.log(coordinates.lat)



    if(!file || !shopTitle || !shopDesc || !telephone || !address || coordinates.lat == undefined){
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
      coordinates: coordinates,
      timings:[schedule1,schedule2,schedule3,schedule4,schedule5,schedule6,schedule7],
      categories:checkboxItems
    };
    console.log( "New shop---",newShop)
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
    setSchedule1({...schedule1, ...day1})
    setSchedule2({...schedule2, ...day2})
    setSchedule3({...schedule3, ...day3})
    setSchedule4({...schedule4, ...day4})
    setSchedule5({...schedule5, ...day5})
    setSchedule6({...schedule6, ...day6})
    setSchedule7({...schedule7, ...day7})
    
    // console.log(coordinates.lat)
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
      coordinates: coordinates,
      timings:[schedule1,schedule2,schedule3,schedule4,schedule5,schedule6,schedule7],
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
        setSchedule1(res.data[0].timings[0])
        setSchedule2(res.data[0].timings[1])
        setSchedule3(res.data[0].timings[2])
        setSchedule4(res.data[0].timings[3])
        setSchedule5(res.data[0].timings[4])
        setSchedule6(res.data[0].timings[5])
        setSchedule7(res.data[0].timings[6])
        setCheckboxItems(res.data[0].categories)
        setCoordinates(res.data[0].coordinates)
        // setShopStatusStateMon(res.data[0].timings[0].shopStatus)
        
        if(schedule1.shopStatus === "Open"){
          setMondayTimingDisabled(false)
        }
        if(schedule7.shopStatus === "Open"){
          setSundayTimingDisabled(false)
        } if(schedule2.shopStatus === "Open"){
          setTuesdayTimingDisabled(false)
        } if(schedule3.shopStatus === "Open"){
          setWednesdayTimingDisabled(false)
        } if(schedule4.shopStatus === "Open"){
          setThursdayTimingDisabled(false)
        } if(schedule5.shopStatus === "Open"){
          setFridayTimingDisabled(false)
        } if(schedule6.shopStatus === "Open"){
          setSaturdayTimingDisabled(false)
        }
      }
    };
    getShop()
  }, [])
console.log(coordinates)

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

  const handleAddressChange = (latLng)=>{
    setCoordinates(latLng)
    // console.log("createShop -> ", latLng)
  }
  

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
              <i className="shopPpIcon fa-solid fa-plus"></i>
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
                sx={{ mt: 2, width: "60%", height: "50%" }}
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

            {/* ===========Monday========== */}
            
            <div className="Weekdays">
            <TextField
              className="monday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Monday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule1.shopStatus == "Open"? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule1({...schedule1, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule1({...schedule1, ...scheduleData})
                  setMondayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule1({...schedule1, ...scheduleData})
                  setMondayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={MondayTimingDisabled}
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
              disabled={MondayTimingDisabled}
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

          {/* ===========Tuesday========== */}


           <div className="Weekdays">
            <TextField
              className="tuesday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Tuesday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule2.shopStatus  == "Open" ? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule2({...schedule2, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule2({...schedule2, ...scheduleData})
                  setTuesdayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule2({...schedule2, ...scheduleData})
                  setTuesdayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={TuesdayTimingDisabled}
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
              disabled={TuesdayTimingDisabled}
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

          {/* ===========Wednesday========== */}

          
        <div className="Weekdays">
            <TextField
            className="wednesday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Wednesday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule3.shopStatus  == "Open" ? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule3({...schedule3, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule3({...schedule3, ...scheduleData})
                  setWednesdayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule3({...schedule3, ...scheduleData})
                  setWednesdayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={WednesdayTimingDisabled}
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
              disabled={WednesdayTimingDisabled}
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

          {/* ===========Thursday========== */}


          <div className="Weekdays">
            <TextField
            className="thursday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Thursday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule4.shopStatus === "Open" ? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule4({...schedule4, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule4({...schedule4, ...scheduleData})
                  setThursdayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule4({...schedule4, ...scheduleData})
                  setThursdayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={ThursdayTimingDisabled}
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule4.timeFrom == undefined ? '' : schedule4.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule4({...schedule4, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
            <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput 
              disabled={ThursdayTimingDisabled}
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule4.timeTo == undefined ? '' : schedule4.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule4({...schedule4, ...scheduleData})
                }}
              />
            </FormControl>
          </div>

          {/* ===========Friday========== */}


          <div className="Weekdays">
            <TextField
            className="friday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Friday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule5.shopStatus  == "Open" ? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule5({...schedule5, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule5({...schedule5, ...scheduleData})
                  setFridayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule5({...schedule5, ...scheduleData})
                  setFridayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={FridayTimingDisabled}
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule5.timeFrom == undefined ? '' : schedule5.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule5({...schedule5, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
            <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput 
              disabled={FridayTimingDisabled}
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule5.timeTo == undefined ? '' : schedule5.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule5({...schedule5, ...scheduleData})
                }}
              />
            </FormControl>
          </div>

          {/* ===========Saturday========== */}
          
          <div className="Weekdays">
            <TextField
            className="saturday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Saturday"
              label="Day"
            >
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule6.shopStatus  == "Open" ? "Enter Hours" : "Closed"}
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule6({...schedule6, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule6({...schedule6, ...scheduleData})
                  setSaturdayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule6({...schedule6, ...scheduleData})
                  setSaturdayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={SaturdayTimingDisabled}
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule6.timeFrom == undefined ? '' : schedule6.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule6({...schedule6, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
            <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput 
              disabled={SaturdayTimingDisabled}
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule6.timeTo == undefined ? '' : schedule6.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule6({...schedule6, ...scheduleData})
                }}
              />
            </FormControl>
          </div>

          {/* ===========Sunday========== */}


          <div className="Weekdays">
            <TextField
            className="sunday"
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-openingday"
              value="Sunday"
              label="Day"
            >
             
            </TextField>
            <TextField
              fullWidth
              sx={{ mt: 3, mb:3, width: "20%", height: "50px", p: 1 }}
              id="outlined-select-closingday"
              select
              label="To"
              value={schedule7.shopStatus  == "Open" ? "Enter Hours" : "Closed" }
              onChange={(e) => {
                scheduleData.dayTo = e.target.value
                setSchedule7({...schedule7, ...scheduleData})
                if(e.target.value === "Closed"){
                  scheduleData.shopStatus = e.target.value
                  setSchedule7({...schedule7, ...scheduleData})
                  setSundayTimingDisabled(true)
                }else{
                  scheduleData.shopStatus = "Open"
                  setSchedule7({...schedule7, ...scheduleData})
                  setSundayTimingDisabled(false)
                }
              }}
              // helperText="Please select your Opening day"
            >
              {shopStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
              <FormHelperText id="filled-weight-helper-text">From</FormHelperText>
              <OutlinedInput
              disabled={SundayTimingDisabled}
                id="outlined-adornment-timeFrom"
                type="time"
                value={schedule7.timeFrom == undefined ? '' : schedule7.timeFrom}
                onChange={(e) => {
                  scheduleData.timeFrom = e.target.value
                  setSchedule7({...schedule7, ...scheduleData})
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 0, mb:3, width: "15%", height: "50px", p: 1 }} variant="outlined">
            <FormHelperText id="filled-weight-helper-text">To</FormHelperText>
              <OutlinedInput 
              disabled={ SundayTimingDisabled }
                id="outlined-adornment-timeTo"
                type="time"
                value={schedule7.timeTo == undefined ? '' : schedule7.timeTo}
                onChange={(e) => {
                  scheduleData.timeTo = e.target.value
                  setSchedule7({...schedule7, ...scheduleData})
                }}
              />
            </FormControl>
          </div> 

          <div className="mapcont">
            <GoogleMap
            getData={handleAddressChange}
            sendCoordinates = {coordinates}
            // style={{width: "20px", height: "20px"}}
            // props={user}
            />
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
              {/* {/ Register failed, Username has already been used /} */}
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