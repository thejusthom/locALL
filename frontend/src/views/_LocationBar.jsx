import * as React from "react";
import styled from "styled-components";
import { SearchBox } from '@mapbox/search-js-react';
import LocationIcon from ".././assets/images/location.svg"
import { saveLocation } from "../store/slices/location-slice";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const LocationBar = () => {
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [showSearchBox, setShowSearchBox] = React.useState(false);
    const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
    const [add,setAdd] = React.useState("");
    const wrapperRef = React.useRef(null);
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
React.useEffect(()=>{
  if(!!add){
  dispatch(saveLocation({...coordinates, pincode: add}));}
}, [add, coordinates, dispatch]);
    useOutsideAlerter(wrapperRef);
    const onFormClick = () => {
        setShowSearchBox(true);
    };
    const onLocationChange = (event) => {
        const location = event?.features[0]?.geometry?.coordinates;
        setCoordinates({longitude: location[0], latitude: location[1]});
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
  headers: {
    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
  }
}).then(res => res.json())
  .then(res => {
    setAdd(res.address.postcode)
    setSelectedLocation(res.address.postcode)
})   
    };
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
              setAdd(res.address?.postcode)
              setSelectedLocation(res.address?.postcode)
            })   
        };
      function error() {
        toast.error("Unable to retrieve your location");
      }}, []);
return(
    <>
          <LocationWrap ref={wrapperRef} style={{display: "flex"}} onClick={onFormClick}>
          <img src={LocationIcon} width={30} height={30} />
{showSearchBox ? 
<SearchBox accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
value={selectedLocation}
onRetrieve={onLocationChange}
/> : <span>{add}</span>}
        </LocationWrap>
    </>
);
};

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