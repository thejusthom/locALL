import * as React from "react";
import mapboxgl from 'mapbox-gl';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import eventsService from "../../services/eventsService";
import { IEvent } from "../../models/events";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactModal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import EventsForm, { Button } from "./_EventsForm";
import { iconList } from "./Constants";
import MyEvents from "./_MyEvents";
import EventsMap from "./_EventsMap";
import FormFieldsComponent from "./_FormFields";
import { ToastContainer, toast } from "react-toastify";
import NoDataScreen from "../../common/_NoDataScreen";
import Loading from "../../common/_Loader";

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
const user = useSelector((state: any) => state.user);

const loc = useSelector(selectLocation);
const [location, setLocation] = React.useState<{ latitude: number; longitude: number;}>({latitude: loc.latitude, longitude: loc.longitude});
const [add,setAdd] = React.useState('');
const [events, setEvents] = React.useState<IEvent[]>();
const [showModal, setShowModal] = React.useState<boolean>(false);
const [newEvent, setNewEvent] = React.useState<IEvent>({...initialNewEvent, locationId: add});
const [selectedLocation, setSelectedLocation] = React.useState("");
const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
const [startDate, setStartDate] = React.useState<Date>();
const [endDate, setEndDate] = React.useState<Date>();
const [organiser, setOrganiser] = React.useState({name: "", contact: ""});
const [tab, setTab] = React.useState(0);
const [isEdit, setIsEdit] = React.useState<boolean>(false);
const [eventId, setEventId] = React.useState<string>("");
const [isValid, setIsValid] = React.useState<boolean>(true);
const [showLoader, setShowLoader] = React.useState(true);

React.useEffect(() => {
    setLocation({latitude: loc.latitude, longitude: loc.longitude});
map.current?.setCenter([loc.longitude, loc.latitude]);
const pincode = loc.pincode;
setAdd(pincode);
// if(!!user._id){
renderEventsByTab();
}, [loc]);

React.useEffect(() => {
    // if(!!user._id){
renderEventsByTab();
    // }
}, [user._id, tab]);

const renderEventsByTab = () => {
    if(tab === 0){
        setShowLoader(true);
    eventsService.getEvents(loc.pincode).then((event)=> {
       const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
    setEvents(availableEvents);
    setShowLoader(false);
    })
    }
        else{
            setShowLoader(true);
            eventsService
            .getEventByParams(loc.pincode, "6573fcd148338641e52772f3")
            .then((event => {
                setEvents(event);
                setShowLoader(false);
            }));
        }
};

  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

	if(!!process.env.REACT_APP_MAPBOX_API_KEY){
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
    };
            if (!map.current && mapContainer.current && !!location?.latitude) {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [location?.longitude, location?.latitude],
                    zoom: 13.5
                    });
                }
    React.useEffect(() => {
    if (mapContainer.current && !!location?.latitude) {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [location?.longitude, location?.latitude],
            zoom: 13.5
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
                        'description': '<div class="popup"><h2 class="title">'+event.eventName+'</h2><p>'+event.descriptionInfo+'</p><p>Contact: '+event.organiser?.name+' ('+event.organiser?.contact+')</p><p>Date: '+event.startDate+' - '+event.endDate+'</p><button class="maps-button" onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button><div>',
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
React.useEffect(() => {
const coordinatesValue = Object.values(coordinates);
const organiserValues = Object.values(organiser);
const {eventName, descriptionInfo, category} = newEvent;
const eventValues = [eventName, descriptionInfo, category];
if(eventValues.includes("") || coordinatesValue.includes(0) || !(organiserValues?.length >= 2) || organiserValues.includes("") || startDate === undefined || endDate === undefined){
    setIsValid(false);
}
else{
    setIsValid(true);
}
}, [newEvent, coordinates, organiser]);

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
    setShowLoader(true);
    event.preventDefault();
    const start = startDate?.toLocaleDateString() || "";
    const end = endDate?.toLocaleDateString() || "";
    eventsService.createEvent(add, {...newEvent, address: {...coordinates}, startDate: start, endDate: end, createdUser: "6573fcd148338641e52772f3", organiser}).then((event)=> {
        !!events ? setEvents([...events, event]) : setEvents([event]);
        setShowLoader(false);
        toast.success("Event Created Successfully!");
    });
    setShowModal(false);
    setNewEvent(initialNewEvent);
    setCoordinates({longitude: 0, latitude:0});
    setSelectedLocation("");
    setStartDate(undefined);
    setEndDate(undefined);
    setOrganiser({name: "", contact: ""});
};
const onEdit = (eventId: string) => {
    setShowLoader(true);
     eventsService.getEventById(loc.pincode, eventId).then((event)=> {
        setNewEvent(event);
        setCoordinates({...event.address});
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
        setOrganiser({...event.organiser});
        setIsEdit(true);
        setEventId(eventId);
        setShowModal(true);
        setShowLoader(false);
    });
};
const onDelete = (eventId: string) => {
    setShowLoader(true);
    eventsService.deleteEvent(loc.pincode, eventId).then((event)=> {
        renderEventsByTab();
            toast.success(`Event Deleted Successfully!`);
    });
};
const onUpdate = () => {
    setShowLoader(true);
    const start = startDate?.toLocaleDateString() || "";
    const end = endDate?.toLocaleDateString() || "";
    const updatedEvent = {...newEvent, address: {...coordinates}, organiser, startDate: start, endDate: end};
    eventsService.updateEvent(loc.pincode, eventId, updatedEvent).then((event)=> {
    renderEventsByTab();
    toast.success(`${event.eventName} Updated Successfully!`);
});
        setNewEvent(initialNewEvent);
        setCoordinates({longitude: 0, latitude:0});
        setStartDate(undefined);
        setEndDate(undefined);
        setOrganiser({name: "", contact: ""});
        setSelectedLocation("");
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
    setSelectedLocation("");
    setOrganiser({name: "", contact: ""});
    if(isEdit){
        setIsEdit(false);
        setEventId(""); 
    }
    setShowModal(false);
};
  const handleTabChange = (event: any, newValue: number) => {
    setTab(newValue);
  };
    return(
        <EventsContainer>
            <ToastContainer position="top-center" closeOnClick />
            <Modal isOpen={showLoader}>
        <Loading isLoading={showLoader} />
        </Modal>
        <Button 
        onClick={() => setShowModal(true)}
        >Create an Event</Button>
               <Tabs sx={{margin: "15px 0 0 0", "& button": {color: "#123abc"}, "& button.Mui-selected": {color: "#123abc"}}} value={tab} onChange={handleTabChange} aria-label="basic tabs example"
               TabIndicatorProps={{sx:{backgroundColor: "#123abc"}}}>
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="All Events" {...a11yProps(0)} />
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="My Events" {...a11yProps(1)} />
        </Tabs>
<Modal isOpen={showModal}>
  <EventsForm isEdit={isEdit}
   eventName={newEvent.eventName}
   onCloseModal={onCloseModal} 
   onUpdate={onUpdate} 
   onSubmit={onSubmit}
   isDisabled={!isValid}
   type="Event"
   children={<FormFieldsComponent
              newEvent={newEvent}
              onCategoryChange={onCategoryChange}
              startDate={startDate}
              endDate={endDate}
              selectedLocation={selectedLocation}
              organiser={organiser}
              onNameChange={onNameChange}
              onDescriptionChange={onDescriptionChange}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              onLocationChange={onLocationChange} 
              onOrganiserChange={onOrganiserChange}
              isEdit={isEdit}
              accessToken={mapboxgl.accessToken} />
            }
    />
  </Modal>
   {tab === 0 ? !!events?.length ? 
(<EventsMap
mapContainer={mapContainer} />) 
:  (<NoDataScreen />)
    : !!events?.length ?
       (<MyEvents
        events={events}
        onEdit={onEdit}
        onDelete={onDelete} />)
        : (<NoDataScreen />)
     }
    </EventsContainer>
    );
}

const EventsContainer = styled.article`
margin: 25px;
.maps-button{
    background-color: #1976d2;
color: white;
cursor: pointer;
border: none;
border-radius: 25px;
font-size: 14px;
padding: 7px 17px;
}
`;

export const Modal = styled(ReactModal)`
inset: unset;
width: 100%;
height: 100%;
background-color: rgba(231, 231, 231, 0.4)
`;

export default EventsView;
