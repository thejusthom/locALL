import * as React from "react";
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import LoactionIcon from ".././assets/images/location.svg"

const LocationBar = () => {
    const [selectedLocation, setSelectedLocation] = React.useState("02119");
    const [showSearchBox, setShowSearchBox] = React.useState(false);
    const [add,setAdd] = React.useState('');
    const wrapperRef = React.useRef(null);

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
    useOutsideAlerter(wrapperRef);
    const onFormClick = () => {
        setShowSearchBox(true);
    };
    const onLocationInputChange = (event) => {
    setSelectedLocation(event.target.value)
    };
    const onLocationChange = (event) => {
        const location = event?.features[0]?.geometry?.coordinates;
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
return(
    <>
          <form ref={wrapperRef} style={{display: "flex"}} onClick={onFormClick}>
          <img src={LoactionIcon} width={30} height={30} />
{showSearchBox ? 
<SearchBox accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
value={selectedLocation}
theme={{icons: {search: ""}}}
onRetrieve={onLocationChange}
/> : <span>{add}</span>}
        </form>
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

export default LocationBar;