import React from "react";
import "./product.css";
import { PicBaseUrl } from "../../imageBaseUrl";
export default function Product({ product }) {

if(product.flavourType){
  const flavourString = product.flavourType
  console.log(flavourString)
  const flavours = flavourString.split("_")
  console.log(flavours)
  var newFlavours = ""
  flavours.map((flavour)=>{
    console.log(flavour)
    if(newFlavours.length < 1){
      newFlavours = flavour
    }else{
      newFlavours += ", "+flavour
    }
  })
  console.log(newFlavours)
}
if(product.strainType){
  if(product.strainType == "Savita"){
    var strainColour = "#AC2E2E"
  }
  if(product.strainType == "Indica"){
    var strainColour = "#68015E"
  }
  if(product.strainType == "Hybrid"){
    var strainColour = "#83B216"
  }
}
  
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
      
         <div className="menu-content content-middle-Nm">
          <h6> <span className="c-name" style={{color:strainColour}}> {product.strainType} </span> {product.recommended ? <span class="recommended"> Recommend </span>: <span></span>} </h6>
          <h3>{product.title}</h3>

           <p> THC : {product.THC}%</p>
           <p> CBD : {product.CBD}%</p>
           <p> Flavour : {newFlavours}</p>

          {/*   <p>{product.productDesc}</p> */}
         <span className="price-text"> Start Price : {product.price} B</span>
        
      </div>
    </div>
  );
}
