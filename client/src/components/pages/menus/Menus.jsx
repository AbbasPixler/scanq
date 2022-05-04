import React from "react";
import "./menus.css";
import Container from "@material-ui/core/Container";
import Shops from "../../shops/Shops";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";

export default function Menus() {

  const [shops, setShops] = useState ([]);

  useEffect(() => {
    const fetchShops = async () => {
      const res = await axiosInstance.get("/shops")
      setShops(res.data)
    }
    fetchShops()
  },[])

  return (
    <Container className="menus">
      <div className="menusTitle">
        <h1>All menu</h1>
      </div>
        <Shops Shops={shops} />
    </Container>
  );
}

