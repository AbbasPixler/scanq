import React from "react";
import "./about.css";
import Container from "@material-ui/core/Container";
import Footer from "../../footer/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import headerimg from "../../../images/headerimg.jpg";
import imgstep1 from "../../../images/menuscan6.jpg";
import imgstep2 from "../../../images/menuscan7.jpg";
import imgstep3 from "../../../images/menuscan4.jpg";
import footerImg from "../../../images/menuscan.jpg";
import vid from "../../../images/video-3.mp4";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container className="aboutBody">
        <div className="aboutTitle">
          <h1>
          - Looking for online menu for your restaurant ?
          </h1>
          <p> Join our community and create online menu with QR code for restaurant FREE today. </p>
          <div className="aboutBtn">
          <Link to="/" className="titleBtnLeft"><span>Explore</span></Link>
          <Link to="/createshop" className="titleBtnRight"><span>Create menu</span></Link>
          </div>
        </div>
        <div className="aboutImg">
          <img src={headerimg} alt="" />
        </div>
      </Container>

      <Container className="registerMe">
        <div className="imgTop">
          <video loop autoplay="autoplay" playsinline muted>
            <source src={vid} />
          </video>

          <div className="registerContent">
            <div className="contentTitle">
              <h1>EATOUT</h1>
            </div>
            <div className="contentDesc">
              <p>
              we are a service platform that support your restaurant to display your menu online 
              </p>
              <Link className="registerMeBtn" to="/Menus">
                {" "}
                Checkout Menu
              </Link>
              
            </div>
          </div>
        </div>
      </Container>

      <div className="about">
        <div className="aboutService">
          <h1>How it works</h1>
          <h3>
            Listed your restaurant with us and get ready for a contactless expreience 
          </h3>
          <Container className="aboutCards">
            <div className="aboutCard">
              <img src={imgstep1} alt='create-menu'/>
              <h4>Transform your offline menu to online</h4>
              <p>Create your account and get start !</p>
            </div>
            <div className="aboutCard">
            <img src={imgstep2} alt='create-menu'/>

              <h4>Create store & Generate Qr code</h4>
              <p>Create your shop then add your product to your online menu</p>
            </div>
            <div className="aboutCard">
              <img src={imgstep3} alt='qr-menu'/>
              <h4>Display Qr code on your media & store</h4>
              <p>
                Copy your shop link address and paste to our QR generator to get
                your restaurant qr menu
              </p>
            </div>
          </Container>
        </div>

        <Container className="aboutContact">
        <div className="aboutContactText">
          <h1>
            - Need help setting up ? Let our support help you listed your menu online
          </h1>
          <a href="https://line.me/en/"><p>CONTACT &gt;</p></a>
        </div>
      </Container>

        <div className="contactUs">
          <Container className="contactContainer">
            <div className="contactLeft">
              <img src={footerImg} alt="" />
              <Link to="/Menus">
                <div className="contactLeftText">
                  <h5>Click/Scan to view Menu</h5>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </Link>
            </div>
            <div className="contactRight">
              <h1>Follow us on</h1>
              <div className="contactRightIcons">
                <a href="https://www.facebook.com/eatout.solutions">
                  <i class="contactRightIcon fa-brands fa-facebook-f"></i>
                </a>
                <i class="contactRightIcon fa-brands fa-instagram"></i>
                <i class="contactRightIcon fa-brands fa-line"></i>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
