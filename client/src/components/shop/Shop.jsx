import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { PicBaseUrl } from "../../imageBaseUrl";
import Rating from '@mui/material/Rating';

export default function Shop({shop}) {
  // const[shopRating, setShopRating] = useState(0)
  // const[numberOfRatings, setNumberOfRatings] = useState(0)
  var shopRating =  0;
  var numberOfRatings = 0;
  if(shop.rating != undefined){
    var average = shop.rating.totalRating /  shop.rating.numberOfRatings
    shopRating = average
    numberOfRatings = shop.rating.numberOfRatings
  }

  return (
    // <Link to={`/shop/${shop.username}`} className="shop">
       <Link to={`/shopDetails/${shop.username}`} className="shop">
      <>
        <div className="shopCard">
          {shop.coverPhoto && 
          <img
            className="shopImg"
            src={PicBaseUrl + shop.coverPhoto}
            alt=""
          />
          }
          <div className="shopInfo">
            
          <p className="ratingSpan"><Rating value={shopRating} precision={0.5}/></p>
            <Link className="menuTitle" to={`/shop/${shop.username}`}>
              {shop.username}
            </Link>
          <div className="shopCats">
            <span className="shopCat">{shop.shopTitle}</span>

          </div>
          
          </div>
        </div>
      </>
    </Link>
  );
}
