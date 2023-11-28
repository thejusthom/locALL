import * as React from "react";
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import LoactionIcon from ".././assets/images/location.svg"

const LocationBar = () => {
    const [selectedLocation, setSelectedLocation] = React.useState("02119");
    const [add,setAdd] = React.useState('')
    const onLocationInputChange = (event) => {
        // console.log(event);
    // setSelectedLocation(event.target.value);
    setSelectedLocation(event.target.value)
    };
    const onLocationChange = (event) => {
        const location = event?.features[0]?.geometry?.coordinates;
        console.log(location)
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
  headers: {
    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
  }
}).then(res => res.json())
  .then(res => {
    setSelectedLocation(res.address.postcode)
})   
console.log(`https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=json`)
        console.log(event);
        console.log("here");
    };
return(
    <>
     <img src={LoactionIcon} width={30} height={30} />
            <span>{selectedLocation}</span>
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
        </form>
        <form>
<SearchBox accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
value={selectedLocation}
onRetrieve={onLocationChange}
// onChange={onLocationChange}
/>
        </form>
    </>
);
};

export default LocationBar;