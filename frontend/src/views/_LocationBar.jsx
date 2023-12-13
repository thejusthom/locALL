import * as React from "react";
import styled from "styled-components";
import { SearchBox } from '@mapbox/search-js-react';
import LocationIcon from ".././assets/images/location.svg"
import { saveLocation } from "../store/slices/location-slice";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

interface ILocationBarProps{
accessToken: String;
}

const LocationBar = (props: ILocationBarProps) => {
  //useState
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [showSearchBox, setShowSearchBox] = React.useState(false);
    const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
    const [add,setAdd] = React.useState("");
    const [city, setCity] = React.useState("");
    // useRef
    const wrapperRef = React.useRef(null);
    // useDispatch
    const dispatch = useDispatch();

    function useOutsideAlerter(ref) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSearchBox(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
//to fetch current location
React.useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    toast.error("Geolocation not supported");
  }    
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  setCoordinates({longitude, latitude});
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
      headers: {
        'User-Agent': 'ID of your APP/service/website/etc. v0.1'
      }
    }).then(res => res.json())
      .then(res => {
        setAdd(res.address?.postcode);
        setSelectedLocation(res.address?.postcode);
        setCity(res.address.city);
      })   
  };
function error() {
  toast.error("Unable to retrieve your location");
}}, []);

React.useEffect(()=>{
  if(!!add){
  dispatch(saveLocation({...coordinates, pincode: add, city}));}
}, [add, coordinates, city, dispatch]);
    useOutsideAlerter(wrapperRef);
    const onFormClick = () => {
        setShowSearchBox(true);
    };
    //to fetch full address and pincode based on provided address in mapbox
    const onLocationChange = (event) => {
        const location = event?.features[0]?.geometry?.coordinates;
        setCoordinates({longitude: location[0], latitude: location[1]});
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
  headers: {
    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
  }
}).then(res => res.json())
  .then(res => {
    setAdd(res.address.postcode);
    setSelectedLocation(res.address.postcode);
    setCity(res.address.city);
})   
    };

return(
    <>
          <LocationWrap ref={wrapperRef} style={{display: "flex"}} onClick={onFormClick}>
          <img src={LocationIcon} width={30} height={30} />
{showSearchBox ? 
<SearchBox accessToken={props.accessToken}
value={selectedLocation}
onRetrieve={onLocationChange}
/> : <span>{add}</span>}
        </LocationWrap>
    </>
);
};

//styling
const LocationWrap = styled.form`
align-items: center;
    margin-top: 3px;
    margin-right: 20px;
    img{
      margin-right: 7px;
    }
    span{
      font-size: 17px;
      font-weight: bold;
    }
    `;

export default LocationBar;