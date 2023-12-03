import * as React from "react";
import mapboxgl from 'mapbox-gl';
import styled from "styled-components";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import { useSelector } from 'react-redux';
import eventsService from "../../services/eventsService";
import { IEvent } from "../../models/events";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SearchBox } from '@mapbox/search-js-react';
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import EvenstForm from "./_EventsForm";
import { iconList } from "./Constants";

const initialNewEvent = {
    eventName: "",
    startDate: "",
    endDate: "",
    descriptionInfo: "",
    address: {longitude: 0, latitude: 0},
    category: "Book",
    locationId: "",
    organiser: {
        name: "", 
        contact: ""
      }
}
const EventsView = () => {
const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);
const [location, setLocation] = React.useState<{ latitude: number; longitude: number;}>({latitude: loc.latitude, longitude: loc.longitude});
const [add,setAdd] = React.useState('');
const [events, setEvents] = React.useState<IEvent[]>();
const [showModal, setShowModal] = React.useState<boolean>(false);
const [newEvent, setNewEvent] = React.useState<IEvent>(initialNewEvent);
const [selectedLocation, setSelectedLocation] = React.useState("");
const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
const [startDate, setStartDate] = React.useState<Date>();
const [endDate, setEndDate] = React.useState<Date>();
const [organiser, setOrganiser] = React.useState({name: "", contact: ""});
const [tab, setTab] = React.useState(0);
const [isEdit, setIsEdit] = React.useState<boolean>(false);
const [eventId, setEventId] = React.useState<string>("");

React.useEffect(() => {
    setLocation({latitude: loc.latitude, longitude: loc.longitude});
map.current?.setCenter([loc.longitude, loc.latitude]);
setAdd(loc.pincode);
eventsService.getEvents(loc.pincode).then((event)=> {
    const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
    setEvents(availableEvents)});
}, [loc]);

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
                        'description': '<strong class="title">'+event.eventName+'</strong><p>'+event.descriptionInfo+'</p><p>Contact: '+event.organiser?.name+' ('+event.organiser?.contact+')</p><p>Date: '+event.startDate+' - '+event.endDate+'</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
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
        map.current?.on('mouseenter', 'places', () => {
            if(map.current){
            map.current.getCanvas().style.cursor = 'pointer';}
        });

        // Change it back to a pointer when it leaves.
      
        map.current?.on('mouseleave', 'places', () => {
              if(map.current){
            map.current.getCanvas().style.cursor = '';}
        });
    });
}}, [events]);

const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({...newEvent, eventName: e.target.value});
}
const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewEvent({...newEvent, descriptionInfo: e.target.value});
}
const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewEvent({...newEvent, category: e.target.value});
}
const onStartDateChange = (date: Date) => {
    setStartDate(date);
}
const onEndDateChange = (date: Date) => {
    setEndDate(date);
}
const onLocationChange = (event: any) => {
    const location = event?.features[0]?.geometry?.coordinates;
    setCoordinates({longitude: location[0], latitude: location[1]});
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
headers: {
'User-Agent': 'ID of your APP/service/website/etc. v0.1'
}
}).then(res => res.json())
.then(res => {
setAdd(res.address.postcode)
const address = event?.features[0]?.properties?.full_address;
setSelectedLocation(!!address ? address : res.address.postcode);
})   
};
const onOrganiserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganiser({...organiser, [e.target.id]: e.target.value});
}
const onSubmit = (event: any) => {
    event.preventDefault();
    const start = startDate?.toLocaleDateString() || "";
    const end = endDate?.toLocaleDateString() || "";
    eventsService.createEvent(add, {...newEvent, address: {...coordinates}, startDate: start, endDate: end, createdUser: "656bbf4a3b7690ac27e2bcfb", organiser}).then((event)=> {
        !!events ? setEvents([...events, event]) : setEvents([event]);
    });
    setShowModal(false);
    setNewEvent(initialNewEvent);
    setCoordinates({longitude: 0, latitude:0});
    setStartDate(undefined);
    setEndDate(undefined);
    setOrganiser({name: "", contact: ""});
};
const onEdit = (eventId: string) => {
     eventsService.getEventById(loc.pincode, eventId).then((event)=> {
        setNewEvent(event);
        setCoordinates({...event.address});
        setStartDate(startDate);
        setEndDate(new Date(event.endDate));
        setOrganiser(event.organiser);
        setIsEdit(true);
        setEventId(eventId);
        setShowModal(true);
    });
};
const onDelete = (eventId: string) => {
    eventsService.deleteEvent(loc.pincode, eventId).then((event)=> {
        eventsService.getEvents(loc.pincode).then((event)=> {
            const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
            setEvents(availableEvents)});
    });
};
const onUpdate = () => {
    const start = startDate?.toLocaleDateString() || "";
    const end = endDate?.toLocaleDateString() || "";
    const updatedEvent = {...newEvent, address: {...coordinates}, organiser, startDate: start, endDate: end};
    eventsService.updateEvent(loc.pincode, eventId, updatedEvent).then((event)=> {
        eventsService.getEvents(loc.pincode).then((event)=> {
            const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
            setEvents(availableEvents)}
    );});
        setNewEvent(initialNewEvent);
        setCoordinates({longitude: 0, latitude:0});
        setStartDate(undefined);
        setEndDate(undefined);
        setOrganiser({name: "", contact: ""});
        setIsEdit(false);
        setEventId("");
        setShowModal(false);
};
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const onCloseModal = () => {
    setNewEvent(initialNewEvent);
    setCoordinates({longitude: 0, latitude:0});
    setStartDate(undefined);
    setEndDate(undefined);
    setOrganiser({name: "", contact: ""});
    if(isEdit){
        setIsEdit(false);
        setEventId(""); 
    }
    setShowModal(false);
};
  const handleTabChange = (event: any, newValue: number) => {
    eventsService.getEvents(loc.pincode).then((event)=> {
        const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
        // setEvents(availableEvents)}
        setEvents(newValue === 0 ? availableEvents : event)});
    setTab(newValue);
  };
  const FormFieldsComponent = () => {return(
    <>
    <InputWrap>
    <label>Name: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="eventName" value={newEvent.eventName} onChange={onNameChange} />
    </InputWrap>
    <InputWrap>
    <label>Description: <MandatoryStar>*</MandatoryStar></label>
    <textarea id="descriptionInfo" value={newEvent.descriptionInfo} onChange={onDescriptionChange} />
    </InputWrap>
    <InputWrap>
    <label>Category: <MandatoryStar>*</MandatoryStar></label>
  <select onChange={onCategoryChange} value={newEvent.category}>
  {iconList?.map((category) => { return<option value={category.label}>{category.label}</option>})}
  </select>
  </InputWrap>
  <InputWrap>
    <label>Start Date: <MandatoryStar>*</MandatoryStar></label>
 <DatePicker 
 selected={startDate} 
 onChange={onStartDateChange} />
  </InputWrap>
<InputWrap>
    <label>End Date: <MandatoryStar>*</MandatoryStar></label>
   <DatePicker 
 selected={endDate} 
 onChange={onEndDateChange} />
    </InputWrap>
 {!isEdit && <InputWrap>
  <label>Location: <MandatoryStar>*</MandatoryStar></label>
  <SearchBox 
accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
value={selectedLocation}
onRetrieve={onLocationChange}
/>
</InputWrap>}
<InputWrap>
    <label>Organiser Name: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="name" value={organiser?.name} onChange={onOrganiserChange} />
    </InputWrap>
    <InputWrap>
    <label>Organiser Contact: <MandatoryStar>*</MandatoryStar></label>
    <input type="text" id="contact" value={organiser?.contact} onChange={onOrganiserChange} />
    </InputWrap>
    </>
)
};
    return(
        <EventsContainer>
        <Button 
        onClick={() => setShowModal(true)}
        >Create an Event</Button>
               <Tabs sx={{margin: "15px 0 0 0"}} value={tab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="All Events" {...a11yProps(0)} />
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="My Events" {...a11yProps(1)} />
        </Tabs>
<Modal isOpen={showModal}>
  <EvenstForm isEdit={isEdit}
   eventName={newEvent.eventName}
   onCloseModal={onCloseModal} 
   onUpdate={onUpdate} 
   onSubmit={onSubmit}
   children={FormFieldsComponent()}
    />
  </Modal>
   {tab === 0 ? <MapContainer>
        <div ref={mapContainer} className="map-container"></div>
    </MapContainer> 
    : (
        <table>
            <thead>
                <th>Name</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {events?.map((event) => 
               <tr key={event._id}>
                    <td>{event.eventName}</td>
                    <td>{event.category}</td>
                    <td>{moment(event.startDate).format("MM/DD/YYYY")}</td>
                    <td>{moment(event.endDate).format("MM/DD/YYYY")}</td>
                    {!!event._id &&
                    <td>
                        <img src={EditIcon} width={25} height={25} onClick={() => onEdit(event._id || "")} />
                        <img src={DeleteIcon} width={25} height={25} onClick={() => onDelete(event._id || "")} />
                    </td>
                    }
                </tr>
            )
        }
            </tbody>
        </table>
    )
     }
    </EventsContainer>
    );
}

const EventsContainer = styled.article`
margin: 25px;
table{
    width: 100%;
    border-collapse: collapse;
    color: #3e3e3e;
    margin-top: 15px;
    th{
        text-align: left;
    }
    img{
        margin-right: 10px;
        cursor: pointer;
    }
    th, td{
        padding: 10px 0;
    }
    td{
        border-bottom: solid 1.5px #4a4a4a30;
    }
}
`;
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
`;

const Modal = styled(ReactModal)`
inset: unset;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.3);
`;

const InputWrap = styled.div`
    margin-bottom: 20px;
    display: flex;
`;
const Button = styled.button`
background-color: #1976d2;
color: white;
padding: 7px 20px;
cursor: pointer;
border: none;
border-radius: 25px;
font-size: 16px;
padding: 10px 25px;
`;
const MandatoryStar = styled.span`
color: #A71313;
`;

export default EventsView;
