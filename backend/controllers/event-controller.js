import e from "express";
import * as eventService from "../services/event-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

//method to get all events for a location
export const getAll = async (request, response) => {
  try {
    //Getting locationId from the request
    const locationId = request.locationId;
    const events = await eventService.getAllEvents(locationId);
    if (events.length == 0) {
      throw new Error("Events not found");
    }
    console.log(events);
    setResponse(events, response, 200);
  } catch (Err) {
    if (Err.message === "Events not found") {
      response.status(404).json({ error: "Events not found" });
    } else {
      console.log(Err);
      setErrorResponse(Err, response);
    }
  }
};

//method to get a event by id
export const getById = async (request, response) => {
  try {
    //Getting event id from request
    const id = request.params.eventId;
    const event = await eventService.getEventById(id);
    if (!event) {
      throw new Error("Event not found");
    }
    console.log(event);
    setResponse(event, response, 200);
  } catch (Err) {
    if (Err.message === "Event not found") {
      response.status(404).json({ error: "Event not found" });
    } else if (Err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(Err);
      setErrorResponse(Err, response);
    }
  }
};

//method to create a event
export const create = async (request, response) => {
  try {
    //Creating a new event with location id and request body
    const newEvent = { ...request.body, locationId: request.locationId };
    const event = await eventService.createEvent(newEvent);
    if (!event) {
      throw new Error("Event not created");
    }
    console.log(event);
    setResponse(event, response, 200);
  } catch (Err) {
    if (Err.message === "Event not created") {
      response.status(404).json({ error: "Event not created" });
    } else if (Err._message === "event validation failed") {
      response.status(400).json({ error: `${Err.message}` });
    } else {
      console.log(Err);
      setErrorResponse(Err, response);
    }
  }
};

// Method to get users by params
export const getByParams = async (request, response) => {
  try {
    const locationId = request.locationId;
    const params = { ...request.query, locationId };
    console.log(params);
    const events = await eventService.getByParams(params);
    if (events.length == 0) {
      throw new Error("Events not found");
    }
    setResponse(events, response, 200);
  } catch (err) {
    if (err.message === "Events not found") {
      response.status(404).json({ error: "Events not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

//method to update a event by id
export const updateById = async (request, response) => {
  try {
    //Getting event id from request
    const id = request.params.eventId;
    const newEvent = { ...request.body };
    const event = await eventService.updateEventById(id, newEvent);
    if (!event) {
      throw new Error("Event not found");
    }
    console.log(event);
    setResponse(event, response, 200);
  } catch (Err) {
    if (Err.message === "Event not found") {
      response.status(404).json({ error: "Event not found" });
    } else if (Err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else if (Err._message === "event validation failed") {
      response.status(400).json({ error: `${Err.message}` });
    } else {
      console.log(Err);
      setErrorResponse(Err, response);
    }
  }
};

//method to delete a event by id
export const deleteById = async (request, response) => {
  try {
    //Getting event id from request
    const id = request.params.eventId;
    const event = await eventService.deleteEventById(id);
    if (!event) {
      throw new Error("Event not deleted");
    }
    console.log(event);
    setResponse({}, response, 200);
  } catch (Err) {
    if (Err.message === "Event not deleted") {
      response.status(404).json({ error: "Event not deleted" });
    } else if (Err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(Err);
      setErrorResponse(Err, response);
    }
  }
};
