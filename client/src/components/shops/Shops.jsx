import React from 'react'
import Shop from '../shop/Shop'
import Container from "@material-ui/core/Container";
import './shops.css'


export default function Shops({Shops}) {
  return (
        <Container className='shopsBody'>
         <div className='shops'>
        {Shops.map((p) => (
            <Shop shop={p}/>
            ))}
        </div>
        </Container>
  )
}
