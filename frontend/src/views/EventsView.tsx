import * as React from "react";
import mapboxgl from 'mapbox-gl';
import file from ".././assets/images/file.png"

const EventsView = () => {
    
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com

//     const mapContainer = React.useRef();
// const map = React.useRef<Map>();
const [location, setLocation] = React.useState<{ latitude: number;
longitude: number;}>({latitude: 38.876516, longitude: -77.007481});
const [add,setAdd] = React.useState('')
// const [weather, setWeather] = React.useState(null);
  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    // map.current = null;
    mapContainer.current = null;
    map.current?.setCenter([longitude, latitude]);
    console.log(add);

    // Make API call to OpenWeatherMap
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setWeather(data);
    //     console.log(data);
    //   })
    //   .catch(error => console.log(error));
  }
//   handleLocationClick();
  function error() {
    console.log("Unable to retrieve your location");
  }
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw';
    //  map.current = new mapboxgl.Map({
    //     container: 'map',
    //     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //     style: 'mapbox://styles/mapbox/streets-v12',
    //     center: [-77.04, 38.907],
    //     zoom: 11.15
    // });
            // if (!map.current && mapContainer.current) {
            //     map.current = new mapboxgl.Map({
            //         container: mapContainer.current,
            //         style: 'mapbox://styles/mapbox/streets-v12',
            //         center: [location?.longitude, location?.latitude],
            //         zoom: 15
            //         });
            //     }
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
    if (!map.current && mapContainer.current) {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [location?.longitude, location?.latitude],
            zoom: 15
            });
        
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
    fetch(url).then(res=>res.json()).then(data=>setAdd(data.address))
    console.log(map.current?.getCenter());
// !!location && map.current?.setCenter([location?.latitude, location?.longitude]);

    map.current?.on('load', () => {
        // const existingSource = map.current?.getSource('places');
        // const existingLayer = map.current?.getLayer('places');
        // // If the source already exists, remove it
        //   if (existingLayer) {
        //     map.current?.removeLayer('places');
        // }
        // if (existingSource) {
        //     map.current?.removeSource('places');
        // }
        map.current?.loadImage(
            file,
            (error, image) => {
            if (error) throw error;
             
            // Add the image to the map style.
            !!image && map.current?.addImage('cat', image);

        map.current?.addSource('places', {
            // This GeoJSON contains features that include an "icon"
            // property. The value of the "icon" property corresponds
            // to an image in the Mapbox Streets style's sprite.
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                            'icon': 'theatre'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.007481, 38.876516]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                            'icon': 'theatre'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.003168, 38.894651]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                            'icon': 'bar'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.090372, 38.881189]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                            'icon': 'art-gallery'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.111561, 38.882342]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
                            'icon': 'bicycle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.052477, 38.943951]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                            'icon': 'rocket'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.043444, 38.909664]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                            'icon': 'music'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.031706, 38.914581]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                            'icon': 'music'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.020945, 38.878241]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                            'icon': 'music'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.007481, 38.876516]
                        }
                    }
                ]
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
        // let urll;
        // function encodeImageFileAsURL(element: any) {
        //     var file = element;
        //     var reader = new FileReader();
        //     reader.onloadend = function() {
        //       console.log('RESULT', reader.result)
        //       urll = reader.result;
        //     }
        //     reader.readAsDataURL(file);
        //   }
        //   encodeImageFileAsURL(".././assets/images/file.png");
        // //   toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0');
        // !!map.current && addImageToMap(map.current, 'another-custom-marker', urll);
        map.current?.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
                'icon-image': 'cat',
                'icon-allow-overlap': true,
                'icon-size': 0.1
            }
        });
    }
    );
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.current?.on('click', 'places', (e) => {
            // Copy coordinates array.
            // const coordinates = !!e.features && e?.features[0]?.geometry?.coordinates.slice();
            const coordinates = e.features?.[0]?.geometry?.type === 'Point' ?
            ((e.features[0].geometry as unknown as mapboxgl.Point) as mapboxgl.Point & { coordinates: [number, number] })?.coordinates?.slice() :
            undefined;
          
            const description = !!e.features && e?.features[0]?.properties?.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            // if(!!map.current && coordinates){
            // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            // }}
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
}}, [location]);

    return(
        <>
         <button onClick={handleLocationClick}>Get Location</button>
    <div ref={mapContainer} className="map-container"></div>
    </>
    );
}

export default EventsView;

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXFjOXEwcjV5MmlwYXAyczExdjJuIn0.swIBmGiiRyTivw7fHcb9aA';

// export default function EventsView() {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const map = useRef<mapboxgl.Map | null>(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (!map.current && mapContainer.current) {
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [lng, lat],
//         zoom: zoom
//       });

//       map.current.on('move', () => {
//         setLng(parseInt(map.current!.getCenter().lng.toFixed(4)));
//         setLat(parseInt(map.current!.getCenter().lat.toFixed(4)));
//         setZoom(parseInt(map.current!.getZoom().toFixed(2)));
//       });

    //   return () => {
    //     if (map.current) {
    //       map.current.remove();
    //     }
    //   };
//     }
//   }, [lng, lat, zoom]);
// console.log(mapContainer)
//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }
