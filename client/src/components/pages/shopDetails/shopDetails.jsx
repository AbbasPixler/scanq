import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Header from "../../header/Header"
import "./map.css"
import  { PicBaseUrl } from "../../../imageBaseUrl";
import MapIcon from '@mui/icons-material/Map';
import Container from "@mui/material/Container";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IosShareIcon from '@mui/icons-material/IosShare';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";

var BudvistaBanner = PicBaseUrl + "BudvistaBanner.jpg"



export default function ShopDetails(){
  return(
    <div>
       <Container>
       <div className="header">
        <img className="headerImg" src={BudvistaBanner} alt="" />
        {/* <div className="headerHead">
          <h1>Find cannis shop around you</h1>
          <a href="#" className="headerBtn">View Map <MapIcon/>

</a>
        </div> */}
        {/* <div className="headerTitles">
            <span className="headerTitlesSm">สร้างออนไลน์เมนูสำหรับร้านของคุณได้แล้ววันนี้</span>
            <span className="headerTitlesLg">BUDVISTA</span>
            <Link to={'/Menutemplate'}>
            <span className="headerBtn">สนใจสร้างออนไลน์เมนู</span>
            </Link>
        </div> */}
       </div>  

       {/* shop-title */}
       <div className="shop-title">
          <div className="shop-location"> <p><LocationOnIcon/>Sathorn, Bangkok</p></div>
          <div className="shop-content">
            <h2>Cannabis Shop Title</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla fuga, laborum facere labore adipisci deleniti at animi? Voluptate quaerat consequatur asperiores, distinctio perspiciatis doloribus non consequuntur nesciunt exercitationem repudiandae.</p>
         </div>
          <div className="shop-share"> <p> <IosShareIcon/> Share</p></div>
       </div>

       <div className="recommended-product">
          <div className="postsTitle">
            <h1>Promotion Events</h1>
          </div>

          <div className="recommended-product-inner">
            <div className="recommended-product-inner-inner">
              <img src="https://storage.googleapis.com/snackyo/1655886005408pexels-kindel-media-7773110.jpg" />
            </div>
            <div className="recommended-product-inner-inner">
              <img src="	https://storage.googleapis.com/snackyo/1655886296008pexels-kindel-media-7773108.jpg" />
            </div>
            <div className="recommended-product-inner-inner">
              <img src="https://storage.googleapis.com/snackyo/1655886654821pexels-dad-grass-9290608.jpg" />
            </div>
            <div className="recommended-product-inner-inner">
              <img src="	https://storage.googleapis.com/snackyo/1655886965842pexels-elsa-olofsson-5079421.jpg" />
            </div>
          </div>
       </div>

       <div className="event-map">
          <div className="postsTitle">
            <h1>Events and Promothion</h1>
          </div>
          <MdChevronLeft
          size={25}
          className="slider-icon iconLeft"
          // onClick={slideLeft}
        />

          <div className="promotion-slider"  id="slider">
            <div className="promotion-slider-inner">
              <div className="promotion-slider-image">
                <img src="https://images.pexels.com/photos/7667801/pexels-photo-7667801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
              </div>
              <div className="promotion-slider-content">
                <p>Shop promotion</p>
                <p>10/11/10</p>
              </div>
            </div>
            <div className="promotion-slider-inner">
              <div className="promotion-slider-image">
                <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
              </div>
              <div className="promotion-slider-content">
                <p>Shop promotion</p>
                <p>10/11/10</p>
              </div>
            </div>
            <div className="promotion-slider-inner">
              <div className="promotion-slider-image">
                <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
              </div>
              <div className="promotion-slider-content">
                <p>Shop promotion</p>
                <p>10/11/10</p>
              </div>
            </div>
            <div className="promotion-slider-inner">
              <div className="promotion-slider-image">
                <img src="https://img.freepik.com/free-photo/cannabis-leaves-shoots-placed-shopping-cart_1150-19252.jpg?w=2000&t=st=1657041724~exp=1657042324~hmac=9fd3a8f8e519d5796a14c063ac28e2d0b7a9df331c82ee3ea07e539f261c5474" />
              </div>
              <div className="promotion-slider-content">
                <p>Shop promotion</p>
                <p>10/11/10</p>
              </div>
            </div>
          </div>


        <MdChevronRight
          size={25}
          className="slider-icon iconRight"
          // onClick={slideRight}
        />
       </div>

       <div className="shop-info">
          <div className="postsTitle">
            <h1>Shop Info</h1>
          </div>

          <div className="shop-info-inner">
            <div className="shop-info-info">
              <ul>
                <li><p><AccessTimeIcon /> <span className="open">open now </span> : <span className="close"> Close 20:00</span></p></li>
                <li><p><LocationOnIcon/> 111/11 sathorn, bangkok, bangkok, thailand 10123</p></li>
                <li><p><LocalPhoneIcon /> 0832-234--1023</p></li>
              </ul>
            </div>
            <div className="shop-info-map">
              <img src="https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-050_worldmap_neu_ma_1.jpg" />
            </div>
          </div>
       </div>

       <div className="follow-section">
        <div className="follow-section-head">
          <h1>Follow Us</h1>
        </div>
        <div className="follow-section-content">
          <div className="follow-section-image">
              <p className="insta"><InstagramIcon /></p>
              <p className="face"><FacebookIcon /></p>
              <p className="tweet"><TwitterIcon /></p>
              <p className="youtube"><YouTubeIcon /></p>
          </div>
          <div className="follow-product-btn">
            <Link className="viewMorePosts" to="#">View product</Link>
          </div>
        </div>
       </div>
       </Container>
      


    </div>
  )
}