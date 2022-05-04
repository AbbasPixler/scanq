import React from 'react'
import './menus1.css'
import Container from "@material-ui/core/Container"
import Menu1 from '../menu1/Menu1'

export default function Menus1({Menus1}) {
  return (
        <Container className='menus1Body'>
    <div className='menus1'>
        {Menus1.map((p) => (
            <Menu1 menu1={p}/>
        ))}
        </div>
        </Container>
  )
}
