import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import weatherService from "../../services/weatherService";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const WeatherView = () => {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  var ad = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: "Haze",
        description: "haze",
        icon: "50d",
      },
    ],
    base: "stations",
    main: {
      temp: 34.9,
      feels_like: 32.27,
      temp_min: 34.9,
      temp_max: 34.9,
      pressure: 1004,
      humidity: 11,
    },
    visibility: 5000,
    wind: {
      speed: 5.66,
      deg: 240,
    },
    clouds: {
      all: 0,
    },
    dt: 1634299964,
    sys: {
      type: 1,
      id: 7576,
      country: "Unkown",
      sunrise: 1634261372,
      sunset: 1634303103,
    },
    timezone: 18000,
    id: 1174872,
    name: "Unknown",
    cod: 200,
  };
  var [wdata, setWData] = React.useState(ad);
  var d = new Date();
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var ddate =
    d.getDate() + "-" + months[d.getMonth()] + "-" + d.getUTCFullYear();
  const selectLocation = (state: any) => state.location.city;
  const city = useSelector(selectLocation);
  React.useEffect(() => {
    if (!!city) {
      const url =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";
      weatherService.getWeather(url).then((response) => {
        setWData(response);
      });
    }
  }, [city]);
  return (
    <Box id="weather-section" sx={{ pb: 5, pt: 5 , backgroundColor: "#f6f6f6" }}>
      <Typography
        component="h2"
        sx={{
          position: "relative",
          fontSize: { xs: 36, md: 46 },
          mt: { xs: 0, md: 7 },
          mb: 4,
          pl: { xs: 2, md: 25 },
          lineHeight: 1,
          fontWeight: "bold",
        }}
      >
        Real-Time{" "}
        <Typography
          component="mark"
          sx={{
            position: "relative",
            color: "primary.main",
            fontSize: "inherit",
            fontWeight: "inherit",
            backgroundColor: "unset",
          }}
        >
          Weather{" "}
        </Typography>
      </Typography>
      <WeatherMainWrap>
        <ToastContainer position="top-center" closeOnClick />
        <WeatherWrap>
          <Card>
            <h5>{wdata.name}</h5>
            <h5>{ddate}</h5>
          </Card>
          <Body>
            <BodyUp className="bodyup">
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  wdata.weather[0].icon +
                  "@4x.png"
                }
                alt=""
              />
              <TempWrap>
                <h5>{wdata.main.temp}</h5>
                <div className="row align-self-center">
                  <p>
                    <i className="fas fa-sort-up"></i> {wdata.main.temp_max}°C
                  </p>
                  <span style={{ fontSize: "10px", color: "rgba(0,0,0,0)" }}>
                    .
                  </span>
                  <p>
                    <i className="fas fa-sort-down"></i> {wdata.main.temp_min}°C
                  </p>
                </div>
              </TempWrap>
            </BodyUp>
            <BodyDown className="row">
              <WeatherData>
                <h1>{wdata.weather[0].main}</h1>
                <h5>{wdata.weather[0].description}</h5>
                <p>
                  Longitude {wdata.coord.lon}
                  <br />
                  Latitude {wdata.coord.lat}
                </p>
              </WeatherData>
              <ExtraDescription>
                <p>
                  <i className="fas fa-thermometer-three-quarters"></i>{" "}
                  {wdata.main.feels_like}°C Feels like
                </p>
                <p>
                  <i className="fas fa-tint"></i> Humidity {wdata.main.humidity}
                  %
                </p>
                <p>
                  <i className="fas fa-wind"></i> Wind Speed {wdata.wind.speed}%
                </p>
                <p>
                  <i className="fas fa-wind"></i> Wind Angle {wdata.wind.deg}°
                </p>
              </ExtraDescription>
            </BodyDown>
          </Body>
        </WeatherWrap>
      </WeatherMainWrap>
    </Box>
  );
};

const WeatherMainWrap = styled.article`
  width: 100%;
  text-align: -webkit-center;
`;
const WeatherWrap = styled.article`
  width: 50%;
  background-color: #aad3e0;
  box-shadow: 0px 0px 15px 5px #b4b1b1;
  border-radius: 7px;
  padding: 20px 0;
  color: white;
  margin: 50px;
`;
const Card = styled.section`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  h5 {
    margin: 0;
    font-size: 24px;
    padding: 3px 25px 20px 25px;
  }
`;
const TempWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 45px;
  h5 {
    font-size: 45px;
  }
  p {
    font-size: 20px;
  }
`;
const WeatherData = styled.div`
  h1 {
    font-size: 45px;
  }
  p {
    font-size: 20px;
  }
`;
const ExtraDescription = styled.div`
  p {
    font-size: 20px;
    margin: 10px;
  }
`;
const Body = styled.div`
  padding: 0 20px 40px 20px;
`;
const BodyUp = styled.div`
  display: flex;
  flex-direction: {
    xs: "column";
  }
  justify-content: space-between;
  margin: 0 25px;
`;
const BodyDown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -25px 45px;
`;

export default WeatherView;
