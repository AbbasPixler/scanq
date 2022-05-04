import React from 'react'
import "./back.css"
import { useNavigate } from 'react-router-dom'

export default function Back() {
const navigate = useNavigate();


  return (
    <div className="back">
    <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  )
}
