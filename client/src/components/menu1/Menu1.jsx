import React from "react";
import { Link } from "react-router-dom";
import "./menu1.css";

export default function Menu1({ menu1 }) {
  return (
    <Link to={`/menu1/${menu1._id}`} className="menu1">
      <>
        <div className="menu1Card">
          <img
            className="menuImg"
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
          <div className="menuInfo">
            <Link className="menuTitle" to={`/menu1/${menu1._id}`}>
              {menu1.username}
            </Link>
          <div className="menuCats">
            <span className="menuCat">Steak</span>
          </div>
          </div>
        </div>
      </>
    </Link>
  );
}
