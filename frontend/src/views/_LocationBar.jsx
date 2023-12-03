import * as React from "react";
import styled from "styled-components";
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import LocationIcon from ".././assets/images/location.svg"
import { saveLocation } from "../store/slices/location-slice";
import { useDispatch } from 'react-redux';

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
    console.log("here")
    console.log(add);
  dispatch(saveLocation({...coordinates, pincode: add}));}
}, [add, coordinates, dispatch]);
    useOutsideAlerter(wrapperRef);
    const onFormClick = () => {
        setShowSearchBox(true);
    };
    // const onLocationInputChange = (event) => {
    // setSelectedLocation(event.target.value)
    // };
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
          console.log("Geolocation not supported");
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
        console.log("Unable to retrieve your location");
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
            {/* <span>{selectedLocation}</span>
            <form>
        <AddressAutofill accessToken={"pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw"}
        onRetrieve={onLocationChange}
        >
          <input
            name="address"
            value={selectedLocation}
            title=" Your Address"
            placeholder="Address"
            type="text"
            className="form-control"
            style={{ marginLeft: "10px", marginTop: "10px" }}
            autoComplete="address-line1"
            onChange={onLocationInputChange}
          />
        </AddressAutofill>
        </form> */}
    </>
);
};

const LocationWrap = styled.form`
align-items: center;
    margin-top: 3px;
    margin-right: 25px;
    img{
      margin-right: 7px;
    }
    span{
      font-size: 17px;
      font-weight: bold;
    }
    `;

export default LocationBar;