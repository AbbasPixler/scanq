import React from "react"
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "./Maps.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="maps-main" style={{backgroundImage:"url(https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-050_worldmap_neu_ma_1.jpg)"}}>
        <Container>
            <div className="map-popup-outer">

            <div>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
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

              <div className="search-around-btn">
              <Link className="viewMorePosts" to="#">search around me</Link>
              </div>
            </div>
        </Container>
    </div>
  )
}