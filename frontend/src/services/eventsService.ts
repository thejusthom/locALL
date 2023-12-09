import axios from "axios";
import { IEvent } from "../models/events";

const API_URL = "http://localhost:3001/location/";

const getEvents = async (locationId: string) => {
    const response = await axios.get(API_URL + locationId +"/events");
    return response.data;
};

const getEventById = async (locationId: string, eventId: string) => {
    const response = await axios.get(API_URL + locationId +"/events/"+eventId);
    return response.data;
};

const getEventByParams = async (locationId:string,createdUser:string) => {
    // const params = {createdUser};
    const params = new URLSearchParams([['createdUser', createdUser]]);
    const response = await axios.get(API_URL + locationId +"/events/params",{ params });
    return response.data;
};

const createEvent = async (locationId: string, newEvent: IEvent) => {
    const response = await axios.post(API_URL + locationId +"/events", newEvent);
    return response.data;
};

const updateEvent = async (locationId: string, eventId: string, updatedEvent: IEvent) => {
    const response = await axios.put(API_URL + locationId +"/events/" + eventId, updatedEvent);
    return response.data;
};

const deleteEvent = async (locationId: string, eventId: string) => {
    const response = await axios.delete(API_URL + locationId +"/events/" + eventId);
    return response.data;
};

const eventsService = { getEvents, getEventById, getEventByParams, createEvent, updateEvent, deleteEvent };
export default eventsService;