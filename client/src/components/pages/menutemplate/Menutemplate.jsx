import React from 'react'
import './menutemplate.css'
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

export default function Menutemplate() {
  return (
    <Container className='menutemplate'>
      <div className="templateTitle">
        <h1>Start creating online menu</h1>
      </div>
      <div className="template">
      <div className="templateCard">
        <div className="cardTitle">
        1. Add shop detail
        </div>
        <div className="cardDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, totam.
        </div>
        <div className="cardimg">
          <img src="https://images.pexels.com/photos/709840/pexels-photo-709840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
        </div>
        <Link to={'/Addproduct'} className="cardbtn">
          Select
        </Link>
      </div>

      <div className="templateCard">
        <div className="cardTitle">
          2. Add your product
        </div>
        <div className="cardDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, sint!
        </div>
        <div className="cardimg">
          <img src="https://images.pexels.com/photos/11236669/pexels-photo-11236669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
        </div>
        <Link to={'/'} className="cardbtn">
          Select
        </Link>
      </div>


      <div className="templateCard">
        <div className="cardTitle">
          3. Download QR code
        </div>
        <div className="cardDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, sint!
        </div>
        <div className="cardimg">
          <img src="https://images.pexels.com/photos/4552131/pexels-photo-4552131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
        </div>
        <Link to={''} className="cardbtn">
        Select
        </Link>
      </div>
      </div>

      </Container>
  )
}
