import * as React from "react";
import mapboxgl from 'mapbox-gl';
import styled from "styled-components";
import Dance from ".././assets/images/dance.png";
import Book from ".././assets/images/book.png";
import Drink from ".././assets/images/drink.png";
import Food from ".././assets/images/food.png";
import Music from ".././assets/images/music.png";
import Pet from ".././assets/images/pet.png";
import Plant from ".././assets/images/plant.png";
import { useSelector } from 'react-redux';
import eventsService from "../services/eventsService";
import { IEvent } from "../models/events";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const EventsView = () => {
const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);
const [location, setLocation] = React.useState<{ latitude: number; longitude: number;}>({latitude: loc.latitude, longitude: loc.longitude});
const [add,setAdd] = React.useState('');
const [events, setEvents] = React.useState<IEvent[]>();
const [showModal, setShowModal] = React.useState<boolean>(false);
const [newEvent, setNewEvent] = React.useState<IEvent>();

React.useEffect(() => {
    setLocation({latitude: loc.latitude, longitude: loc.longitude});
map.current?.setCenter([loc.longitude, loc.latitude]);
setAdd(loc.pincode);
eventsService.getEvents(loc.pincode).then((event)=> {
    console.log(event);
    setEvents(event)});
}, [loc]);
console.log(events);
const iconList = [{
    label: "Book",
    url: Book
},
{
    label: "Dance",
    url: Dance
},
{
    label: "Drink",
    url: Drink
},
{
    label: "Food",
    url: Food
},
{
    label: "Music",
    url: Music
},
{
    label: "Pet",
    url: Pet
},
{
    label: "Plant",
    url: Plant
}
]

  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

	mapboxgl.accessToken = 'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw';
            if (!map.current && mapContainer.current && !!location?.latitude) {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [location?.longitude, location?.latitude],
                    zoom: 15
                    });
                }
    React.useEffect(() => {
        // if (map.current) return; // initialize map only once
    //     if (mapContainer.current) {
    //     map.current = new mapboxgl.Map({
    //     container: mapContainer.current,
    //     style: 'mapbox://styles/mapbox/streets-v12',
    //     center: [location?.longitude, location?.latitude],
    //     zoom: 15
    //     });
    // }
    if (mapContainer.current && !!location?.latitude) {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [location?.longitude, location?.latitude],
            zoom: 15.25
            });
        
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
    fetch(url).then(res=>res.json()).then(data=>setAdd(data.address))

    !!events && map.current?.on('load', () => {
        const existingSource = map.current?.getSource('places');
        const existingLayer = map.current?.getLayer('places');
        // If the source already exists, remove it
          if (existingLayer) {
            map.current?.removeLayer('places');
        }
        if (existingSource) {
            map.current?.removeSource('places');
        }
            iconList.forEach((icon) => {
               map.current?.loadImage(
                icon.url,
                (error, image) => {
                if (error) throw error;
                 
                // Add the image to the map style.
                !!image && map.current?.addImage(icon.label, image);}); 
            }); 
            map.current?.addSource('places', {
            // This GeoJSON contains features that include an "icon"
            // property. The value of the "icon" property corresponds
            // to an image in the Mapbox Streets style's sprite.
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
               'features': events?.map((event) => 
                  ({
                    'type': 'Feature',
                    'properties': {
                        'description': '<strong class="title">'+event.eventName+'</strong><p>'+event.descriptionInfo+'</p><p>Contact: Ashmiya V(1234567643)</p><p>Date: startDate - endDate</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
                        'icon': event.category,
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [event.address.longitude, event.address.latitude]
                    }})
                  ),
            }
        });
        // Add a layer showing the places.
        const addImageToMap = (map: mapboxgl.Map, name: string, imageUrl: any) => {
            return new Promise<void>((resolve, reject) => {
                map?.loadImage(imageUrl, (error: any, image: any) => {
                    if (error) throw error;
                    map?.addImage(name, image);
                    resolve();
                });
            });
        }
        map.current?.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true,
                'icon-size': 0.1
            }
        });
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.current?.on('click', 'places', (e) => {
            const coordinates = e.features?.[0]?.geometry?.type === 'Point' ?
            ((e.features[0].geometry as unknown as mapboxgl.Point) as mapboxgl.Point & { coordinates: [number, number] })?.coordinates?.slice() :
            undefined;
          
            const description = !!e.features && e?.features[0]?.properties?.description;
            if(!!map.current && coordinates){
                 const lngLat = new mapboxgl.LngLat(coordinates[0], coordinates[1]);
            new mapboxgl.Popup()
                .setLngLat(lngLat)
                .setHTML(description)
                .addTo(map.current);}
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        // if(map.current){
        map.current?.on('mouseenter', 'places', () => {
            if(map.current){
            map.current.getCanvas().style.cursor = 'pointer';}
        });

        // Change it back to a pointer when it leaves.
      
        map.current?.on('mouseleave', 'places', () => {
              if(map.current){
            map.current.getCanvas().style.cursor = '';}
        });
    // }
    });
}}, [events]);
    return(
        <>
        <Button 
        onClick={() => setShowModal(true)}
        >Create an Event</Button>
<Modal
  open={showModal}
  onClose={() => setShowModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Create an Event
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
    <FormControl fullWidth>
                            <InputLabel htmlFor="event-name">Name</InputLabel>
                            <OutlinedInput
                                id="event-name"
                                name="name"
                                label="Event Name"
                                value={newEvent?.eventName}
                            />
                                <InputLabel htmlFor="event-description">Description</InputLabel>
                            <OutlinedInput
                                id="event-description"
                                name="name"
                                label="Description"
                                value={newEvent?.descriptionInfo}
                            />
                                  <InputLabel htmlFor="event-description">Description</InputLabel>
                            <OutlinedInput
                                id="event-description"
                                name="name"
                                label="Description"
                            />
                            <InputLabel id="category-label">Category</InputLabel>
                              {/* <Select
    labelId="category-label"
    id="category"
    // value={newEvent?.category || {}}
    label="Category"
    // onChange={handleChange}
    
  > {iconList?.map((category) => { return<MenuItem value={category.label}>{category.label}</MenuItem>})}
  </Select> */}
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker />
 </LocalizationProvider>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker />
  </LocalizationProvider>
                        </FormControl>

  </Box>
</Modal>
        {/* <button>
            Create an Event
        </button> */}
    <MapContainer>
        <div ref={mapContainer} className="map-container"></div>
    </MapContainer>
    </>
    );
}

const MapContainer = styled.section`
    text-align: -webkit-center;
    margin-top: 40px;
    .title{
        font-size: 16px;
        color: red;
    }
`;

export default EventsView;
