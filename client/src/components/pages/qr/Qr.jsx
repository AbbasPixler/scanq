import React from "react";
import "./qr.css";
import QRCode from "qrcode.react";
import { useState } from "react";
import Sideprofile from "../../sideprofile/Sideprofile";

export default function Qr() {
  const [qrValue, setQrValue] = useState("myqr");
  const handleOnChange = (event) => {
    const { value } = event.target;
    setQrValue(value);
  };
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr">
      <div className="genQr">
        <h1>Qr generator</h1>
        <input
          onChange={handleOnChange}
          placeholder="paste shop link here get qr code.."
        />
        <br />
        <QRCode
          id="qr-gen"
          value={qrValue}
          size={300}
          bgColor="white"
          level={"H"}
          includeMargin={true}
          className="myQr"
        />{" "}
        <button type="button" onClick={downloadQRCode}>
          Download QR Code
        </button>
      </div>
      <Sideprofile />
    </div>
  );
}
