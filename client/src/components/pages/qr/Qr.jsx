import React, { useContext } from "react";
import "./qr.css";
import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import Sideprofile from "../../sideprofile/Sideprofile";
import { Context } from "../../../context/Context";
import {html2canvas} from "html2canvas";
// import { Baseurl } from "../../../Baseurl";
import { TextField } from "@mui/material";
import { Slider } from "@mui/material";
import { Grid } from "@mui/material";
// import * as htmlToImage from 'html-to-image';


export default function Qr() {
  // const Baseurl =  "http://localhost:3000/"
  const Baseurl =  "https://www.budvista.co/"



  
  const user = useContext(Context)
  const[size, setSize] = useState("220px")
  const[borderRadius, setBorderRadius] = useState("1")
  const[actualRadius, setActualRadius] = useState()
  const[bgColor, setBgColor] = useState("#ffffff")
  const[fgColor, setFgColor] = useState("#000000")
  const[text, setText] = useState("EatOut")
  // const paddingString = padding + "px"
  // const divStyle = {
  //   padding: paddingString,
  //   backgroundColor: bgColor
  // };

  const modifyRadius = (e)=>{
    const radiusString = e.target.value
    console.log(e.target.value)
    setActualRadius(radiusString+"px")
    setBorderRadius(radiusString)
  }


  // ===============================================

 
  // ===============================================
  
  


  const qrValue = Baseurl + "shop/" + user.user.username;
  const downloadQRCode = () => {
    
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${user.user.username}qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadQRCodePlusDiv = () => {
    
    // var node = document.getElementById('print');

  //   htmlToImage.toJpeg(document.getElementById('print'), { quality: 0.95 })
  // .then(function (dataUrl) {
  //   var link = document.createElement('a');
  //   link.download = 'my-image-name.jpeg';
  //   link.href = dataUrl;
  //   link.click();
  // });
    // htmlToImage.toPng(node)
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //     download(dataUrl, img);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
  };

  return (
    <div className="qr">
      <div className="genQr">
      <div className="qrcode-content">
      <div className="qrcode-content-inner">
        <h1>Customize QR Code</h1>
        <div className="form-group bg-color-element hide-picbg">
        <label>Background color</label>
        <TextField
          name='bgColor'
          type='color'
          value={bgColor}
          className="colorInput"
          onChange={(e) => setBgColor(e.target.value)}
        />
         <span className="colorcode">{bgColor}</span>
        </div>

        <div className="form-group bg-color-element">
        <label>Foreground color</label>
        <TextField
          name='fgColor'
          type='color'
          value={fgColor}
          className="colorInput"
          onChange={(e) => setFgColor(e.target.value)}
        />
        <span className="colorcode">{fgColor}</span>
       </div>

        <div className="form-group">
        {/* <label>Mode</label>
        <input
        id="paddingSlider"
        name="size"
        type="range"
        value={size}
        style={{backgroundColor: "black", color: "red"}}
        min='280'
        max='320'
        track= "inverted"
        // onChange={(e) => setSize(e.target.value)}
        />   */}
         </div>

        <div className="form-group">
        {/* <label>Corner Radius</label>
        <input
        id="borderRadiusSlider"  
        name="borderRadius"
        type="range" 
        min='1'
        max='50'
        onChange={modifyRadius}
        />   */}
        </div>  


        {/* <label>Padding</label>
        <input
        name="padding"
        type="range"
        value={padding}
        min='0'
        max='10'
        onChange={(e) => setPadding(e.target.value)}
        /> */}

        <div className="form-group">
        {/* <label>Text</label>
        <TextField
          name='text'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        /> */}
        </div>

        

       

           
          </div>
          </div>
          

        <div className="qrcode-icon ">
           <div id="print" style={{width:230, height:230, backgroundColor: bgColor ,display:'flex', alignItems:'center', justifyContent:'center', borderRadius: actualRadius, borderStyle: "solid", borderColor: "transparent"}}>
        {/* <p style={{zIndex:1, backgroundColor: "white", position: "absolute", fontSize: "20px", padding:" 10px 15px", fontWeight: 500, letterSpacing: "1px", }} >{text}</p> */}
        
            <QRCode
  
              id="qr-gen"
              value={qrValue}
              // size= '275'
              bgColor={bgColor}
              fgColor={fgColor}
              // level={"H"}
              style={{borderRadius: actualRadius, borderStyle: "solid", borderColor: "transparent", height: '220px', width: '220px', maxWidth:"auto", maxHeight:"auto"}}
             
              // className="myQr"
            />
          
        </div>

       <div className="download-btn">
       <button type="button" onClick={downloadQRCode} style={{margin: "14px"}}>
          Download QR Code
        </button>
       </div>
        </div>
        

      </div>
      <Sideprofile />
    </div>
  );
}



