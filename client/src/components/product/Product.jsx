import React from "react";
import "./product.css";
import { PicBaseUrl } from "../../imageBaseUrl";
export default function Product({ product }) {

  return (
      <div className="product-menupage">
        <div className="product-imgs">
        {product.productImage && (
           <img
          src={PicBaseUrl + product.productImage}
           alt=""
          />
          )}
        </div>        
      <div className="menu-content">
        <h3>{product.title}</h3>
        <p>{product.productDesc}</p>
        <span>{product.price}</span>
      </div>
    </div>
  );
}
