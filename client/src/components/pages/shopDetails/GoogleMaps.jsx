import React, { Component, useState } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { PicBaseUrl } from '../../../imageBaseUrl';



 function MapContainer(props){
  const[address ,setAddress] = useState("")
  const[showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 22.7017909334,
    lng: 75.8708558335
 });
 const [afterAddress, setAfterAddress]= useState({})
 const [markers, setMarker] = useState([
  {
    lat: 22.7017909334,
    lng: 75.8708558335
  }, 
  {
    lat: 22.69983,
    lng: 75.8673
   }
  ])

  const containerStyle = {
  
    width: '100%',
    height: '100%'
  }


  if(props.sendCoordinates != undefined){
    // setMapCenter(props.sendCoordinates)
  }
  // console.log( "From Database: " , props.sendCoordinates.lat)
  return (
// ===========================================================
          <div id='googleMaps'>

                 
                <Map 
                
                containerStyle={containerStyle}
                google={props.google}
                initialCenter={{
                  lat: props.sendCoordinates != undefined ? props.sendCoordinates.lat : mapCenter.lat,
                  lng: props.sendCoordinates != undefined ? props.sendCoordinates.lng : mapCenter.lng
                }}
                center={{
                  lat: props.sendCoordinates != undefined ? props.sendCoordinates.lat : mapCenter.lat,
                  lng: props.sendCoordinates != undefined ? props.sendCoordinates.lng : mapCenter.lng
                }}
              >

            {  props.sendCoordinates != undefined ?
           <Marker
           position ={{
             lat: props.sendCoordinates.lat,
             lng: props.sendCoordinates.lng
           }}
           icon={{
            url: "https://storage.googleapis.com/snackyo/map-marker1.png",
          }}
           />
              :
              markers.map((marks)=>(
                <Marker
                position ={{
                  lat: marks.lat,
                  lng: marks.lng
                }}
                />
              ))
            }
              
         
         </Map>
          </div>
// ===========================================================
  )
}

 export default GoogleApiWrapper({
  apiKey: ('AIzaSyCyHn--Okuy3Q62gDaGI_64tCuf1svZ97k')
})(MapContainer)