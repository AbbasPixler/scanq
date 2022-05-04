import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../config';
import './singlecat.css'

export default function Singlecat() {

    const location = useLocation()
    const path = (location.pathname.split("/")[2])
    const [cats, setCats] = useState ({});

    useEffect(() => {
      const getCat = async () => {
        const res = await axiosInstance.get('/cetegories/' + path)
        setCats(res.data)
      };    
      getCat()
    },[path])
  return (
    <div className='singlecat'>
        {cats.name}
        </div>
  )
}
