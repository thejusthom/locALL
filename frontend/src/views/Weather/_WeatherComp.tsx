import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import weatherService from "../../services/weatherService";

const Section = () => {
// var [city, setCity] = React.useState("");
// var [warning, setWarning] = React.useState("");

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
var ad = {
coord: {
lon: 0,
lat: 0
},
weather: [
{
id: 0,
main: "Haze",
description: "haze",
icon: "50d"
}
],
base: "stations",
main: {
temp: 34.9,
feels_like: 32.27,
temp_min: 34.9,
temp_max: 34.9,
pressure: 1004,
humidity: 11
},
visibility: 5000,
wind: {
speed: 5.66,
deg: 240
},
clouds: {
all: 0
},
dt: 1634299964,
sys: {
type: 1,
id: 7576,
country: "Unkown",
sunrise: 1634261372,
sunset: 1634303103
},
timezone: 18000,
id: 1174872,
name: "Unknown",
cod: 200
}
var [wdata, setWData] = React.useState(ad);
var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var ddate = d.getDate()+"-"+months[d.getMonth()]+"-"+d.getUTCFullYear();
console.log(ddate);
const selectLocation = (state: any) => state.location.city;
const city = useSelector(selectLocation);

// function search(){
// if(city===""){
// setWarning("Please select a city.");
// }
// else{
// var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
// // var url = `http://api.openweathermap.org/data/2.5/weather?q=&lat=${42.3284508}&lon=${-71.0863725}&appid=`+apiKey+"&units=metric";
// // {latitude: , longitude: }
// axios.get(url)
// .then(function (response) {
// // handle success
// console.log(response);
// setWData(response.data);
// })
// .catch(function (error) {
// // handle error
// console.log(error);
// // if(error.response.status){
// //     setWarning("Please enter a valid city name");
// // }
// })
// .then(function () {
// // always executed
// });
// }
// console.log(wdata)
// }
console.log(apiKey);
return(
<WeatherWrap>
{/* <div className="container"> */}
{/* <div className="search">
<center>
<div className="searchbar">
<input type="text" onChange={(e)=>{setCity(e.target.value); setWarning("")}} placeholder="City name" name="" id="" />
{!!apiKey && <button onClick={search}><i className="fas fa-search"></i></button>}
</div>
<br /><sub style={{color: "red"}}>{warning}</sub>
</center>
</div> */}
{/* <div className="cardd">
<div className="header">
<div className="row">
<div className="col-lg-6 col-md-6 col-sm-6 col-s-12 card-header-left">
<h5>{wdata.name}</h5>
</div>
<div className="col-lg-6 col-md-6 col-sm-6 col-s-12 card-header-right">
<h5>{ddate}</h5>
</div>
</div>
</div> */}
<Card>
    <h5>{wdata.name}</h5>
    <h5>{ddate}</h5>
</Card>
<Body>
    <BodyUp className="bodyup">
    {/* <TempRow className="row"> */}
{/* <ImageWrap> */}
<img src={"http://openweathermap.org/img/wn/"+wdata.weather[0].icon+"@4x.png"} alt="" />
{/* </ImageWrap> */}
{/* <div className="col-lg-6 col-md-12 col-sm-12 col-s-12 align-self-center"> */}
<TempWrap>
{/* <div className="col-lg-6 col-md-6 col-sm-6"> */}
<h5>{wdata.main.temp}</h5>
{/* <p>{wdata.main.feels_like}°C feels like</p> */}
{/* </div> */}
{/* <div className="col-lg-4 col-md-4 col-sm-4 col-s-4"> */}
<div className="row align-self-center">
<p><i className="fas fa-sort-up"></i> {wdata.main.temp_max}°C</p>
<span style={{fontSize: "10px", color: "rgba(0,0,0,0)"}}>.</span>
<p><i className="fas fa-sort-down"></i> {wdata.main.temp_min}°C</p>
</div>
{/* </div> */}
</TempWrap>
{/* <div className="row" style={{textAlign: "left"}}>
</div> */}
{/* </div> */}
{/* </TempRow> */}
 </BodyUp> 
{/* <BodyDown className="bodydown"> */}
<BodyDown className="row">
<WeatherData>
<h1>{wdata.weather[0].main}</h1>
<h5>{wdata.weather[0].description}</h5>
<p>Longitude {wdata.coord.lon}<br />Latitude {wdata.coord.lat}</p>
</WeatherData>
<ExtraDescription>
<p><i className="fas fa-thermometer-three-quarters"></i>   {wdata.main.feels_like}°C Feels like</p>
<p><i className="fas fa-tint"></i> Humidity {wdata.main.humidity}%</p>
<p><i className="fas fa-wind"></i> Wind Speed {wdata.wind.speed}%</p>
<p><i className="fas fa-wind"></i> Wind Angle {wdata.wind.deg}°</p>
</ExtraDescription>
</BodyDown>
{/* </BodyDown> */}
</Body>
{/* </div> */}
{/* // </div> */}
</WeatherWrap>
);
}

const WeatherWrap = styled.article`
width: 500px;
background-color: lightblue;
    border-radius: 7px;
    padding: 20px 0;
    color: white;
`;
const Card = styled.section`
display: flex;
justify-content: space-between;
border-bottom: 1px solid;
h5{
    margin: 0;
    padding: 0 20px 10px 20px;
}
`;
const TempWrap = styled.div`
display: flex;
align-items: center;
margin-right: 45px;
h5{
    font-size: 45px;
}
`;
const ImageWrap = styled.div`

`;
const WeatherData = styled.div``;
const ExtraDescription = styled.div``;
const Body = styled.div`
padding: 0 20px 20px 20px;
`;
const BodyUp = styled.div`
display: flex;
justify-content: space-between;
`;
const TempRow = styled.div`
display: flex;
align-items: center;
`;
const BodyDown = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: -25px 45px;
`;

export default Section;