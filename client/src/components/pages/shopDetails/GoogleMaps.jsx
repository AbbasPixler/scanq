import React, { Component, useState } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



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

  // console.log(props.sendCoordinates)
  const containerStyle = {
  
    width: '40%',
    height: '45%'
  }

  // console.log(afterAddress.lat)

  const handleChange = (address) => {
    setAddress(address );
  };
 
  const handleSelect = (address) => {
    setAddress( address );
    console.log(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => { 
        console.log('Success', latLng);
        setAfterAddress(latLng)
        // update center state
        setMapCenter(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  return (
// ===========================================================
          <div id='googleMaps'>
          {/* <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete> */}

          <Map 
            containerStyle={containerStyle}
            google={props.google}
            initialCenter={{
              lat: mapCenter.lat,
              lng: mapCenter.lng
            }}
            center={{
              lat: mapCenter.lat,
              lng: mapCenter.lng
            }}
          >

            {  props.sendShops != undefined ?
              props.sendShops.map((shop)=>{
                if(shop.coordinates){
                  return(
                    <Marker
                    value= {shop.username}
                  position = {{
                    lat: shop.coordinates.lat,
                    lng: shop.coordinates.lng
                  }}
                  />
                  )
                }
                })
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