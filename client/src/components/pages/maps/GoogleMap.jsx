import React, { Component, useState } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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



 function MapContainer(props){
  const style = {
    display: "flex",
      // height: "100%",
      alignItems: "center",
      marginLeft: "30px",
      position: "absolute",
      top: "50%",
      left: '0',
      transform: 'translate(0, -50%)'
  };


  const [open, setOpen] = React.useState(false);
  const [shop, setShop] = useState([])
  const [products, setProducts] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [open_1, setOpen_1] = React.useState(false);
  const handleOpen_1 = () => setOpen_1(true);
  const handleClose_1 = () => setOpen_1(false);



  const[address ,setAddress] = useState("")
  const[showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 13.736717,
    lng: 100.523186
 });
 const [afterAddress, setAfterAddress]= useState({})
 const [markers, setMarker] = useState([
  {
lat: 22.7017909334,
    lng: 75.8708558335
  }, 
  {
    lat: 22.69983,
    lng: 75.8673
   }
  ])

  const containerStyle = {
    width: '100%',
    height: '80vh',
    position: "sticky"
  }

  const handleOpenPopup = async(e)=>{
      const res = await axiosInstance.get('/shops/' + e.value )
      const res2 = await axiosInstance.get('/products/' + e.value )
      setShop(res.data)
      setProducts(res2.data)
    
    handleOpen()
  }
 console.log(products)

  return (
// ===========================================================
          <div id='googleMaps'>
         

          <Map 
            containerStyle={containerStyle}
            google={props.google}
            initialCenter={{
              lat: mapCenter.lat,
              lng: mapCenter.lng
            }}
            center={{
              lat: mapCenter.lat,
              lng: mapCenter.lng
            }}
          >

            { props.sendShops != undefined ?
              props.sendShops.map((shop)=>{
                if(shop.coordinates){
                  return(
                    <Marker
                    value= {shop.username}
                    onClick={handleOpenPopup}
                  position = {{
                    lat: shop.coordinates.lat,
                    lng: shop.coordinates.lng
                  }}
                  
                icon={{
                  url: "https://storage.googleapis.com/snackyo/map-marker1.png",
                }}
                  />
                  )
                }
                })
              :
              markers.map((marks)=>(
                <Marker
                position ={{
                  lat: marks.lat,
                  lng: marks.lng
                }}
                
                icon={{
                  url: "https://storage.googleapis.com/snackyo/map-marker1.png",
                }}
                />
              ))
            }
              
         
         </Map>
         <div>
              {/* <Button onClick={handleOpen}>modal one</Button> */}
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
                        <img src= {shop[0] != undefined? PicBaseUrl + shop[0].coverPhoto: PicBaseUrl+"Budvista.png"} />
                      </div>
                      <div className="map-popup-modal-image-content">
                        <h6>{shop[0] != undefined? shop[0].shopTitle : "Shop Title"}</h6>
                        <p>Dispensary</p>
                        <p>{shop[0] != undefined? shop[0].address : "Shop Title"}</p>
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
                      {/* <div className="map-popup-modal-icon-inner">
                        <Link to="#">
                          <FavoriteBorderIcon />
                          <p>Favorite</p>
                        </Link>  
                      </div> */}
                    </div>                    

                    <div className="map-popup-view-btn">
                    <Link to={shop[0] != undefined ? `/shopDetails/${shop[0].username}` : "#"} >View Shop</Link>
                      {/* <Link to="#">View Menu</Link> */}
                    </div>

                    <div className="map-popup-modal-hours">
                      <h2>Hours of Operation</h2>
                      <p className="open">Open Now</p>

                      <div className="map-popup-modal-hours-inner">
                      <ul>
                          <li>
                            <h6>Monday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[0].shopStatus == "Open" ? shop[0].timings[0].timeFrom + " - " +  shop[0].timings[0].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Tuesday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[1].shopStatus == "Open"? shop[0].timings[1].timeFrom + " - " +  shop[0].timings[1].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Wednesday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[2].shopStatus == "Open"? shop[0].timings[2].timeFrom + " - " +  shop[0].timings[2].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Thursday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[3].shopStatus == "Open"? shop[0].timings[3].timeFrom + " - " +  shop[0].timings[3].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Friday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[4].shopStatus == "Open"? shop[0].timings[4].timeFrom + " - " +  shop[0].timings[4].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Saturday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[5].shopStatus == "Open"? shop[0].timings[5].timeFrom + " - " +  shop[0].timings[5].timeTo : "Closed"}</p>
                          </li>
                          <li>
                            <h6>Sunday</h6>
                            <p>{shop[0] != undefined && shop[0].timings[6].shopStatus == "Open"? shop[0].timings[5].timeFrom + " - " +  shop[0].timings[5].timeTo : "Closed"}</p>
                          </li>
                            </ul>
                          </div>

                          <div className="map-popup-view-btn">
                          {products != "false"?  <Link to="#"  onClick={handleOpen_1}>CHECKOUT PRODUCT</Link> : <Link to={shop[0] != undefined ? `/shopDetails/${shop[0].username}` : "#"}>Shop Detail</Link>}
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

                
                    {
                       products != "false" ?
                      products.map((product)=>{
                        return(
                          <div className="map-popup-modal-image map-popup-modal-image_1">
                            <div className="map-popup-modal-image-image">
                              <img src= {PicBaseUrl + product.productImage} />
                            </div>
                            <div className="map-popup-modal-image-content">
                              <h6>{product.title}</h6>
                              <p>{product.category}</p>
                              <Link to="#" className="map-popup-modal-image-content-link">Open</Link>
                            </div>
                            <div className="map-popup-modal-heart">
                              <FavoriteBorderIcon />
                            </div>
                          </div>
                        )
                      })
                      :
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
                    }
                    

                     {/*<div className="map-popup-modal-image map-popup-modal-image_1">
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
                    </div> */}


                    <div className="map-popup-modal-upper map-popup-modal-upper_1 map-popup-modal-upper_2 ">
                      <p>scroll for more</p>
                      <Link to="#"><KeyboardArrowDownIcon /></Link>
                    </div>
                  </div>                
                </div>
                </Box>
              </Modal>
            </div>        
          </div>
// ===========================================================
  )
}

 export default GoogleApiWrapper({
  apiKey: ('AIzaSyCyHn--Okuy3Q62gDaGI_64tCuf1svZ97k')
})(MapContainer)