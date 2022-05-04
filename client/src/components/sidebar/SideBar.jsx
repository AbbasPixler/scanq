import "./sidebar.css";
import line from "../../images/line-man.png"
import grab from "../../images/grab.png"
import robinhood from "../../images/robinhood.jpg"
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";

export default function SideBar() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [shop, setShop] = useState({});
  const [shoptime1, setShoptime1] = useState({});
  const [shoptime2, setShoptime2] = useState({});
  const [shoptime3, setShoptime3] = useState({});
  useEffect(() => {
    const getShop = async () => {
      const res = await axiosInstance.get("/shops/getShopDetail/" + path);
      // console.log(res.data[0])
      setShop(res.data[0]);
      setShoptime1(res.data[0].timings[0]);
      setShoptime2(res.data[0].timings[1]);
      setShoptime3(res.data[0].timings[2]);
    };
    getShop();
  }, [path]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log(shop)
  
  return (
    <div className="sidebar">
      <div className="sideHeader">
        <h1>Info</h1>
      </div>
      <div className="sideHour">
        <div className="sideTitle">
        <h3>Opening Hours</h3>
        </div>
        <div className="sideDate">
          <div>
            {shoptime1 && <p>{shoptime1 && shoptime1.dayFrom} - {shoptime1 && shoptime1.dayTo} : {shoptime1 && shoptime1.timeFrom} - { shoptime1 && shoptime1.timeTo}</p>}
          </div>
          <div>
            {shoptime2 && <p>{shoptime2 && shoptime2.dayFrom} - {shoptime2 && shoptime2.dayTo} : {shoptime2 && shoptime2.timeFrom} - { shoptime2 && shoptime2.timeTo}</p>}
          </div>
          <div>
           {shoptime3 && <p>{shoptime3 && shoptime3.dayFrom} - {shoptime3 && shoptime3.dayTo} : {shoptime3 && shoptime3.timeFrom} - { shoptime3 && shoptime3.timeTo}</p>}
          </div>
        </div>
      </div>
      <div className="sideAddress">
        <div className="sideTitle">
        <h5>Address</h5>
        </div>
        <p>{shop.address}</p>
        {/* <a href="" className="btn">
          Map 
        </a> */}
      </div>
      <div className="sideContact">
        <h5>Tel :</h5>
        <a href="">
          <p>{shop.telephone}</p>
        </a>
      </div>
      <div className="sideSocial">
        <div className="sideTitle">
        <h5>FOLLOW US</h5>
        </div>
        <div className="sideIcons">
          {shop.facebook && <a href={shop.facebook} target="_blank"><i className="sideIcon fa-brands fa-facebook"></i></a>}
          {shop.instagram && <a href={ shop.instagram } target="_blank"><i className="sideIcon fa-brands fa-instagram"></i></a>}
          {shop.twitter && <a href={shop.twitter} target="_blank"><i className="sideIcon fa-brands fa-twitter"></i></a>}
          {shop.youtube && <a href={shop.youtube} target="_blank"><i className="sideIcon fa-brands fa-youtube"></i></a>}
        </div>
      </div>
      <div className="sideOrder">
        <div className="sideTitle">
        <h5>ONLINE DELIVERY</h5>
        </div>
        <div className="sideOrderImg">
        {shop.grab && <a href={shop.grab} target="_blank"><img src={grab} width="25" height="25" alt="" /></a>}
        {shop.lineman && <a href={shop.lineman} target="_blank"><img src={line} width="25" height="25" alt="" /></a>}
        {shop.robinhood && <a href={shop.robinhood} target="_blank"><img src={robinhood} width="25" height="25" alt="" /></a>}
        </div>
      </div>

      <Link to={`/shop/${shop.username}`} className="sideMenu">
        <p>VIEW MENU</p>
      </Link>

      
    </div>
  );
}
