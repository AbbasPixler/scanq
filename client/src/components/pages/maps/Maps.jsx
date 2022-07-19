import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "./Maps.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import GoogleMap from "./GoogleMap"
import Typography from '@mui/material/Typography';
import { axiosInstance } from "./../../../config";
import  { PicBaseUrl } from "../../../imageBaseUrl";

// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
import parkData from './skateboard-parks.json';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import mapStyles from "./mapStyles";


const style = {
  display: "flex",
    // height: "100%",
    alignItems: "center",
    marginLeft: "30px",
    position: "absolute",
    top: "50%",
    left: '0',
    transform: 'translate(0, -50%)'
  // position: 'absolute',
  // top: '50%',
  // left: '0%',
  // // transform: 'translate(-50%, -50%)',
  // // width: 400,
  // bgcolor: 'background.paper',
  // // border: '2px solid #000',
  // // boxShadow: 24,
  // p: 4,
};


export default function Maps(){
  const REACT_APP_GOOGLE_KEY = "AIzaSyCyHn--Okuy3Q62gDaGI_64tCuf1svZ97k"

  const [open, setOpen] = React.useState(false);
  const [shop, setShop] = useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const getShop = async () => {
      const res = await axiosInstance.get('/shops/')
      setShop(res.data)
     
    };
    getShop()
  }, [])

  const [open_1, setOpen_1] = React.useState(false);
  const handleOpen_1 = () => setOpen_1(true);
  const handleClose_1 = () => setOpen_1(false);

  return (
    <div className="maps-main">
        <Container>
        <div className="map-popup-outer" style={{ width: "100%", height: "100%" }}>
            {/* <div className="map-popup-outer" style={{ width: "100vw", height: "100vh" }}> */}
          {/* =========================================== */}

          {/* <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /> */}
      <GoogleMap
      sendShops={shop}
      />

          {/* =========================================== */}
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} onClick={handleClose}>
                  <div className="map-popup-modal">
                  <div className="map-popup-modal-outer">
                    <div className="map-popup-modal-upper">
                      <p onClick={handleClose}><ArrowBackIosNewIcon /> Back to result</p>
                    </div>

                    <div className="map-popup-modal-image">
                      <div className="map-popup-modal-image-image">
                        <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
                      </div>
                      <div className="map-popup-modal-image-content">
                        <h6>Hightland cafe</h6>
                        <p>Dispensary</p>
                        <p>Thonglor/Bangkok</p>
                      </div>
                    </div>

                    <div className="map-popup-modal-icon">
                      <div className="map-popup-modal-icon-inner">
                        <Link to="#">
                          <LocationOnIcon />
                          <p>Call</p>
                        </Link>
                      </div>
                      <div className="map-popup-modal-icon-inner">
                        <Link to="#">
                          <LocalPhoneIcon />
                          <p>Phone</p>
                        </Link>
                      </div>
                      <div className="map-popup-modal-icon-inner">
                        <Link to="#">
                          <IosShareIcon />
                          <p>Share</p>
                        </Link>
                      </div>
                      <div className="map-popup-modal-icon-inner">
                        <Link to="#">
                          <FavoriteBorderIcon />
                          <p>Favorite</p>
                        </Link>  
                      </div>
                    </div>                    

                    <div className="map-popup-view-btn">
                      <Link to="#">View Menu</Link>
                    </div>

                    <div className="map-popup-modal-hours">
                      <h2>Hours of Opertaion</h2>
                      <p className="open">Open Now</p>

                      <div className="map-popup-modal-hours-inner">
                        <ul>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                          <li>
                            <h6>Monday</h6>
                            <p>09:00 - 20:00</p>
                          </li>
                            </ul>
                          </div>

                          <div className="map-popup-view-btn">
                            <Link to="#" className="viewMorePosts">View Menu</Link>
                          </div>
                        </div>
                  </div>                
                </div>
                </Box>
              </Modal>
            </div> 

            <div>
              {/* <Button onClick={handleOpen_1}>modal two</Button> */}
              <Modal
                open={open_1}
                onClose={handleClose_1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} onClick={handleClose}>
                  <div className="map-popup-modal">
                  <div className="map-popup-modal-outer">
                    <div className="map-popup-modal-upper map-popup-modal-upper_1">
                      <p>search result cannabis shop around thonglhor</p>
                    </div>

                    <div className="map-popup-modal-image map-popup-modal-image_1">
                      <div className="map-popup-modal-image-image">
                        <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
                      </div>
                      <div className="map-popup-modal-image-content">
                        <h6>Hightland cafe</h6>
                        <p>Dispensary</p>
                        <Link to="#" className="map-popup-modal-image-content-link">Open</Link>
                      </div>
                      <div className="map-popup-modal-heart">
                        <FavoriteBorderIcon />
                      </div>
                    </div>

                    <div className="map-popup-modal-image map-popup-modal-image_1">
                      <div className="map-popup-modal-image-image">
                        <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
                      </div>
                      <div className="map-popup-modal-image-content">
                        <h6>Hightland cafe</h6>
                        <p>Dispensary</p>
                        <Link to="#" className="map-popup-modal-image-content-link">Open</Link>
                      </div>
                      <div className="map-popup-modal-heart">
                        <FavoriteBorderIcon />
                      </div>
                    </div>

                    <div className="map-popup-modal-image map-popup-modal-image_1">
                      <div className="map-popup-modal-image-image">
                        <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
                      </div>
                      <div className="map-popup-modal-image-content">
                        <h6>Hightland cafe</h6>
                        <p>Dispensary</p>
                        <Link to="#" className="map-popup-modal-image-content-link">Open</Link>
                      </div>
                      <div className="map-popup-modal-heart">
                        <FavoriteBorderIcon />
                      </div>
                    </div>


                    <div className="map-popup-modal-upper map-popup-modal-upper_1 map-popup-modal-upper_2 ">
                      <p>scroll for more</p>
                      <Link to="#"><KeyboardArrowDownIcon /></Link>
                    </div>
                  </div>                
                </div>
                </Box>
              </Modal>
            </div>              

              <div className="search-around-btn">
              <Link className="viewMorePosts" to="#">search around me</Link>
              </div>
            </div>
        </Container>
    </div>
  )
}