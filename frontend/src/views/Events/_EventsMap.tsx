import * as React from "react";
import styled from "styled-components";

interface IEventsMap{
mapContainer: React.LegacyRef<HTMLDivElement> | undefined;
}

const EventsMap = (props: IEventsMap) => {
    const { mapContainer } = props;
    return(
        <MapContainer>
        <div ref={mapContainer} className="map-container"></div>
</MapContainer> 
    );
}

const MapContainer = styled.section`
text-align: -webkit-center;
margin-top: 20px;
.title{
    font-size: 16px;
    color: red;
}
.geocoder {
position: absolute;
z-index: 20;
right: 10%;
top: 14%;
text-decoration: none;
list-style-type: none;
}
.map-container {
  height: 500px;
  /* width: 95%; */
}

.sidebar {
  background-color: rgb(35 55 75 / 90%);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
}

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
`;


export default EventsMap;