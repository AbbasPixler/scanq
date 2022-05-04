import React from "react";
import "./menusbycat.css";
import Container from "@material-ui/core/Container";
import Shops from "../../shops/Shops";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";
import { useLocation } from 'react-router-dom'

export default function MenusByCat() {
  const location = useLocation()
  const path = (location.pathname.split("/")[2])
  const [shopByCat, setShopByCat] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const res = await axiosInstance.get("/shops/getShopCategory/"+path)
      setShopByCat(res.data)
    }
    fetchShops()
  },[path])
  return (
    <Container className="menus">
      <div className="menusTitle">
        <h1>{path}</h1>
      </div>
       {shopByCat ? <Shops Shops={shopByCat} /> : <p className="shops_error">Currently there is no shops available in this category.</p> }
    </Container>
  );
}

