import axios from "axios";

const API_URL = "http://localhost:3001/location/";

const getEvents = async (locationId:string) => {
    const response = await axios.get(API_URL + locationId +"/events");
    return response.data;
};

const eventsService = { getEvents };
export default eventsService;