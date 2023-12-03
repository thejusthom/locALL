import axios from "axios";
import { IEvent } from "../models/events";

const API_URL = "http://localhost:3001/location/";

const getEvents = async (locationId: string) => {
    const response = await axios.get(API_URL + locationId +"/events");
    return response.data;
};

const createEvent = async (locationId: string, newEvent: IEvent) => {
    const response = await axios.post(API_URL + locationId +"/events", newEvent);
    return response.data;
};

const eventsService = { getEvents, createEvent };
export default eventsService;