import React from 'react'
import './directory.css'
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container'


export default function directory() {
  return (
    <Container className='directory'>
        <div className="aboutDirectory">
        <div className="aboutDirectoryTitle">
        <span>About</span>
        <div className="aboutDirectorySubtitle">
                <Link to=''>
                    What is Budvista
                </Link>
                <Link to=''>
                    Talk to us
                </Link>
                <Link to=''>
                    Work with us
                </Link>
                </div>
        </div>
        <div className="aboutDirectoryTitle">
        <span>Online menu</span>
        
        <div className="aboutDirectorySubtitle">
                <Link to=''>
                    Why online menu
                </Link>
                <Link to=''>
                How to list my shop
                </Link>
                <Link to=''>
                    How to list add product
                </Link>
                </div>
        </div>

        <div className="aboutDirectoryTitle">
        <span>Business solution</span>
        
        <div className="aboutDirectorySubtitle">
                <Link to=''>
                    List my shop
                </Link>
                <Link to=''>
                    Contact support
                </Link>
                <Link to='/Menutemplate'>
                    Menu builder
                </Link>
                </div>
        </div>

        <div className="aboutDirectoryForm">
                <a href='https://lin.ee/CsBrWSv' className='requestDemo'>
                <span>Request demo</span>
                </a>
                

        </div>

        </div>
    </Container>
  )
}
