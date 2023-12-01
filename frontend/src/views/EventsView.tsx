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
// import ReactDomServer from 'react-dom/server';
import reactElementToJSXString from 'react-element-to-jsx-string';
import eventsService from "../services/eventsService";
import { IEvent } from "../models/events";

const EventsView = () => {
const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);
const [location, setLocation] = React.useState<{ latitude: number; longitude: number;}>({latitude: loc.latitude, longitude: loc.longitude});
const [add,setAdd] = React.useState('');
const [events, setEvents] = React.useState<IEvent[]>();
const eventsClone = !!events ? [...events] : [];
const data = eventsClone?.map((event) => ({
  'type': 'Feature',
  'properties': {
      'description': '<strong class="title">'+event.eventName+'</strong><p>'+event.descriptionInfo+'</p><p>Contact: Ashmiya V(1234567643)</p><p>Date: startDate - endDate</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
      'icon': 'theatre',
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [location.longitude, location.latitude]
  }})
);
const showInMapClicked = (latitude: number, longitude: number) => {
    console.log("here");
    window.open("https://maps.google.com?q="+latitude+","+longitude);
  };
  const handleButtonClick = () => {
    window.open('https://maps.google.com?q=' + 30 + ',' + 30);
  };
//   const eventDetails = (
//       <>
//         <strong>Make it Mount Pleasant</strong>
//         <p>
//           <a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">
//             Make it Mount Pleasant
//           </a>{' '}
//           is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.
//         </p>
//         <p>Contact: Ashmiya V(1234567643)</p>
//         <p>Date: {"sfsf"} - {"sdsdfs"}</p>
//         <button onClick={handleButtonClick}>Open in Google Maps</button>
//       </>);
// const popUpComponent = () => 
// {return(
// <>
//     <strong>"Make it Mount Pleasant"</strong>
//     <p>
//     <a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a>
//      is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.
//      </p>
//      <p>Contact: Ashmiya V(1234567643)</p>
//      <p>Date: startDate - endDate</p>
//      <button onClick={() => window.open("https://maps.google.com?q="+location.latitude+","+location.longitude)}>Open in Google Maps</button>
//      </>
//      )};
    // const description = reactElementToJSXString(popUpComponent());
React.useEffect(() => {
// if(!!loc){
    setLocation({latitude: loc.latitude, longitude: loc.longitude});
map.current?.setCenter([loc.longitude, loc.latitude]);
setAdd(loc.pincode);
eventsService.getEvents(loc.pincode).then((event)=> {
    console.log(event);
    setEvents(event)});
// }
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
// const eventsData = [
//     {
//         'type': "Feature",
//         'properties': {
//             'description': '<strong class="title">Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p><p>Contact: Ashmiya V(1234567643)</p><p>Date: startDate - endDate</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
//             'icon': 'theatre',
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [location.longitude, location.latitude]
//         }
//     }];
  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

	mapboxgl.accessToken = 'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw';
    //  map.current = new mapboxgl.Map({
    //     container: 'map',
    //     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //     style: 'mapbox://styles/mapbox/streets-v12',
    //     center: [-77.04, 38.907],
    //     zoom: 11.15
    // });
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
    console.log(map.current?.getCenter());

// !!location && map.current?.setCenter([location?.latitude, location?.longitude]);

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
        // map.current?.loadImage(
        //     Dance,
        //     (error, image) => {
        //     if (error) throw error;
             
        //     // Add the image to the map style.
        //     !!image && map.current?.addImage('Dance', image);});
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
                // 'features': [...eventsData],
                // 'features': data,
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
                // 'features': [
                //  {
                //                 'type': 'Feature',
                //                 'properties': {
                //                     // 'description': eventDetails,
                //                     'description': '<strong class="title">Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p><p>Contact: Ashmiya V(1234567643)</p><p>Date: startDate - endDate</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
                //                     'icon': 'theatre'
                //                 },
                //                 'geometry': {
                //                     'type': 'Point',
                //                     'coordinates': [location.longitude, location.latitude]
                //                 }
                //             },
                // ]

                // 'features': [
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             // 'description': eventDetails,
                //             'description': '<strong class="title">Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p><p>Contact: Ashmiya V(1234567643)</p><p>Date: startDate - endDate</p><button onclick="(function(){window.open(\'https://maps.google.com?q='+location.latitude+','+location.longitude+'\');})();">Open in Google Maps</button>',
                //             'icon': 'theatre'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [location.longitude, location.latitude]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                //             'icon': 'theatre'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.003168, 38.894651]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                //             'icon': 'bar'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.090372, 38.881189]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                //             'icon': 'art-gallery'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.111561, 38.882342]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
                //             'icon': 'bicycle'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.052477, 38.943951]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                //             'icon': 'rocket'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.043444, 38.909664]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                //             'icon': 'music'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.031706, 38.914581]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                //             'icon': 'music'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.020945, 38.878241]
                //         }
                //     },
                //     {
                //         'type': 'Feature',
                //         'properties': {
                //             'description':
                //                 '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                //             'icon': 'music'
                //         },
                //         'geometry': {
                //             'type': 'Point',
                //             'coordinates': [-77.007481, 38.876516]
                //         }
                //     }
                // ]
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
