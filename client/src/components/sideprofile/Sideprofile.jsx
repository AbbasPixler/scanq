import React from "react";
import "./sideprofile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';

export default function SideProfile() {
  return (
    <>
      <div className="sideprofile">
        <div className="sideDashboard">
          <h3>Dashboard</h3>
          <div className="sideprofileWrapper">
            <Button>
              <Link to={"/profileinfo"} className="sidePage">
                <AccountCircleIcon />
                <p>Profile Info</p>
              </Link>
            </Button>
            {/* <Button>
              <Link to={"/Addproduct"} className="sidePage">
                <ChromeReaderModeIcon />
                <p>My menu</p>
              </Link>
            </Button> */}
            <Button>
              <Link to={"/createshop"} className="sidePage">
                <HomeIcon />
                <p>Create Shop</p>
              </Link>
            </Button>
            <Button>
              <Link to={"/Addproduct"} className="sidePage">
                <AddCircleOutlineIcon />
                <p>Create Menu</p>
              </Link>
            </Button>
            <Button>
              <Link to={"/Addproductcategory"} className="sidePage">
                <CategoryIcon />
                <p>Add Product Category</p>
              </Link>
            </Button>
            <Button>
              <Link to={"/allproduct"} className="sidePage">
                <InventoryIcon />
                <p>All product</p>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}