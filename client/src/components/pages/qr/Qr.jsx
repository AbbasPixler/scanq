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

export default function Qr() {
  const Baseurl =  "http://localhost:3000/"
  // const Baseurl =  "https://www.eatout.solutions/"


  
  const user = useContext(Context)
  const[size, setSize] = useState("400")
  const[borderRadius, setBorderRadius] = useState("1")
  const[actualRadius, setActualRadius] = useState()
  const[bgColor, setBgColor] = useState("white")
  const[fgColor, setFgColor] = useState("black")
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

  // const handleDownloadImage = async() => {
  //   const element = document.getElementById('print'),
  //   canvas = await html2canvas(element),
  //   data = canvas[0].toDataURL('image/jpg'),
  //   link = document.createElement('a');
 
  //   link.href = data;
  //   link.download = 'downloaded-image.jpg';
 
  //   document.body.appendChild(link)
;
  //   link.click();
  //   document.body.removeChild(link)
;
  // };

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

  return (
    <div className="qr">
      <div className="genQr">
        <h1>Qr generator</h1>
        <label>Size</label>
        <input
        id="paddingSlider"
        name="size"
        type="range"
        value={size}
        min='200'
        max='400'
        track= "inverted"
        // step="1"
        onChange={(e) => setSize(e.target.value)}
        />  

        <input
        id="borderRadiusSlider"
        name="borderRadius"
        type="range"
        value={borderRadius}
        min='1'
        max='50'
        // step="1"
        onChange={modifyRadius}
        />  
        {/* <label>Padding</label>
        <input
        name="padding"
        type="range"
        value={padding}
        min='0'
        max='10'
        onChange={(e) => setPadding(e.target.value)}
        /> */}
        <label>Text</label>
        <TextField
          name='text'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label>Background color</label>
        <TextField
          name='bgColor'
          type='color'
          value={bgColor}
          className="colorInput"
          onChange={(e) => setBgColor(e.target.value)}
        />
        <label>foreground color</label>
        <TextField
          name='fgColor'
          type='color'
          value={fgColor}
          className="colorInput"
          onChange={(e) => setFgColor(e.target.value)}
        />
        <br />
        <div id="print" style={{width:400, height:400, backgroundColor: bgColor ,display:'flex', alignItems:'center', justifyContent:'center', borderRadius: actualRadius, borderStyle: "solid", borderColor: "transparent"}}>
        <p style={{zIndex:1, backgroundColor: "white", position: "absolute", fontSize: "20px", padding:" 10px 15px", fontWeight: 500, letterSpacing: "1px", }} >{text}</p>
          
            <QRCode

              id="qr-gen"
              value={qrValue}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              // level={"H"}
              style={{borderRadius: actualRadius, borderStyle: "solid", borderColor: "transparent"}}
             
              // className="myQr"
            />
     
        </div>
        <button type="button" onClick={downloadQRCode}>
          Download QR Code
        </button>
      </div>
      <Sideprofile />
    </div>
  );
}






// import React from "react";
// import "./qr.css";
// import QRCode from "qrcode.react";
// import { useState } from "react";
// import Sideprofile from "../../sideprofile/Sideprofile";

// export default function Qr() {
//   const [qrValue, setQrValue] = useState("myqr");
//   const handleOnChange = (event) => {
//     const { value } = event.target;
//     setQrValue(value);
//   };
//   const downloadQRCode = () => {
//     // Generate download with use canvas and stream
//     const canvas = document.getElementById("qr-gen");
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     let downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = `${qrValue}.png`;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="qr">
//       <div className="genQr">
//         <h1>Qr generator</h1>
//         <input
//           onChange={handleOnChange}
//           placeholder="paste shop link here get qr code.."
//         />
//         <br />
//         <QRCode
//           id="qr-gen"
//           value={qrValue}
//           size={300}
//           bgColor="white"
//           level={"H"}
//           includeMargin={true}
//           className="myQr"
//         />{" "}
//         <button type="button" onClick={downloadQRCode}>
//           Download QR Code
//         </button>
//       </div>
//       <Sideprofile />
//     </div>
//   );
// }



// var canvas = document.getElementById("qr-gen");
//var context = canvas.getContext(contextType);

// $("#qr-gen").click(function(){  
//   $("#qr-gen").append("abbas");  
// });  