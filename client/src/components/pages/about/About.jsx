import React from "react";
import "./about.css";
import Container from "@material-ui/core/Container";
import Footer from "../../footer/Footer";
import { useEffect } from "react";

export default function About() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div className="about">
      <Container className="aboutHead">
        <img src="https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        <Container className="headtxt">
          <h1>สร้างเมนูออนไลน์สำหรับร้านอาหารของคุณ ผ่าน scanq ฟรี</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
            tempore molestiae adipisci officia beatae excepturi quibusdam eius?
            Corporis, incidunt tempora?
          </p>
          <button className="headbtn">Join now</button>
        </Container>
      </Container>

      <div className="aboutService">
        <h1>How to</h1>
        <Container className="aboutCards">
          <div className="aboutCard">
            <i class="fa-solid fa-book-open">
              <p>
                Create your shop
              </p>
            </i>
          </div>
          <div className="aboutCard">
            <i class="fa-solid fa-utensils">
              <p>
                Add product
              </p>
            </i>
          </div>
          <div className="aboutCard">
            <i class="fa-solid fa-qrcode">
              <p>
                Generate QR scan !
              </p>
            </i>
          </div>
        </Container>
      </div>

      <div className="aboutBody">
        <div className="aboutTitle">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            delectus!
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
            eaque sed recusandae id quaerat
          </p>
        </div>
      </div>



      <div className="aboutPrice">
        <h1>Our service</h1>
        <Container className="aboutCards">
          <div className="aboutPriceCard">
              <ul className="priceTitle">Host menu</ul>
              <li>Menu template</li>
              <li>QR generator</li>
              <li>Create event</li>
              <li>Subtitles</li>
              <button className="cardBtn">Select now</button>
          </div>
          <div className="aboutPriceCard">
              <ul className="priceTitle">Host menu</ul>
              <li>Menu template</li>
              <li>QR generator</li>
              <li>Create event</li>
              <li>Subtitles</li>
              <button className="cardBtn">Select now</button>
          </div>
          <div className="aboutPriceCard">
              <ul className="priceTitle">Host menu</ul>
              <li>Menu template</li>
              <li>QR generator</li>
              <li>Create event</li>
              <li>Subtitles</li>
              <button className="cardBtn">Select now</button>
          </div>
        </Container>
      </div>

      <div className="contactUs">
        <h1>Contact us</h1>
        <Container className="contactContainer">
          <div className="contactLeft">
            See Demo Menu
            </div>
          <div className="contactRight"> 
            Follow us on social media
            </div>
        </Container>
        </div>
    </div>
    <Footer/>
    </>
  );
}
