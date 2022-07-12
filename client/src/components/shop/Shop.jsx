import React from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { PicBaseUrl } from "../../imageBaseUrl";

export default function Shop({shop}) {
  return (
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
