/////////////////single menu page//////////////////////.

import React from "react";
import "./singleMenu.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Products from "../products/Products";
import { axiosInstance } from "../../config";
import { PicBaseUrl } from "../../imageBaseUrl";
import { Context } from "../../context/Context";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const categories = [
  {
    value: "Top Pick",
    label: "Top Pick",
  },
  {
    value: "Favourite",
    label: "Favourite",
  },
  {
    value: "Recommended",
    label: "Recommended",
  },
  {
    value: "New Menu",
    label: "New Menu",
  },
  {
    value: "Special",
    label: "Special",
  },
];


export default function SingleMenu() {
  
  const location = useLocation()
  const path = (location.pathname.split("/")[2])
  const [shop, setShop] = useState ({});
  const [products, setproducts] = useState([])
  const [productCategories, setProdductCategories] = useState([])
  const user = useContext(Context);
  const[shopOpen, setShopOpen] = useState("Close")
  const [closeTime, setCloseTime] = useState("")

  const [category, setCategory]= useState("")

    const slides = [1];
    const slideLeft = () => {
      const slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft - 500;
    };
  
    const slideRight = () => {
      const slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
      const getShop = async () => {
        const res = await axiosInstance.get('/shops/' + path)
        setShop(res.data[0])
        
      let newDate = new Date().getDay() 
     
      if(newDate == 1 && res.data[0].timings[0].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[0].timeTo)
      }
      if(newDate == 2 && res.data[0].timings[1].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[1].timeTo)
      }
      if(newDate == 3 && res.data[0].timings[2].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[2].timeTo)
      }
      if(newDate == 4 && res.data[0].timings[3].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[3].timeTo)
      }
      if(newDate == 5 && res.data[0].timings[4].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[4].timeTo)
      }
      if(newDate == 6 && res.data[0].timings[5].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[5].timeTo)
      }
      if(newDate == 7 && res.data[0].timings[6].shopStatus == "Open"){
        setShopOpen("Open")
        setCloseTime(res.data[0].timings[6].timeTo)
      }
      };
      getShop()
    },[path])

    useEffect(() => {
      const fetchProduct = async () => {
        const res = await axiosInstance.get("/products/" + path)
        setproducts(res.data)
      }
      fetchProduct();
    },[path])

    useEffect(() => {
      const fetchProductCategories = async () => {
        const res = await axiosInstance.get("/product_categories/" + path);
        setProdductCategories(res.data);
      };
      fetchProductCategories();
    },[path]);
    
    const handleCategoryChange= async (e)=>{  
      e.preventDefault()
      const category = e.target.value;
      const res = await axiosInstance.get("/products/category/"+category+"/"+path);
      setCategory(res.data[0].category)

      setproducts(res.data)
    }
  return (  
    <Container className="singlemenu">
      <div className="headerimg">
        {shop.coverPhoto && 
        <img src={PicBaseUrl + shop.coverPhoto} alt="" />
        }
      </div>
      <div className="menutitle">
        <div className="menutitle_img">
          <img src="https://storage.googleapis.com/snackyo/budvista_logo.png" />
        </div>
        <h1>{shop.shopTitle}</h1>
        <h1>{shop.address}</h1>
        <p className="time"><AccessTimeIcon/> <span className="open">{shopOpen == "Open"? shopOpen + " now" : shopOpen}</span> {shopOpen == "Open"? <span className="close">:  Closes {closeTime}</span> : <span className="close"></span>}</p>
      </div>

      <div className="menuFilters">
      <MdChevronLeft
          size={40}
          className="filter-icon iconLeft"
          onClick={slideLeft}
        />
        <div className="menuFilter" id="slider">
        {slides.map((slide, index) => {
            return (
              <>
              {productCategories.map((option) => (
              <button className="filters" value={option.name} onClick = {handleCategoryChange} >{option.name}</button>
              ))}
              </>
            );
           })}
        </div>
          <MdChevronRight
          size={40}
          className="filter-icon iconRight"
          onClick={slideRight}
        />  
      </div>


      <div className="menuProduct" id="slider">
          {<Products category = {category} products={products}/>}
      </div>
    </Container>
  );
}