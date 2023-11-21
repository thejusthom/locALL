import * as eventService from '../services/event-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

//method to get all events for a location
export const getAll = async (request, response) => {
  try
  {
    //Getting locationId from the request
    const locationId = request.locationId;
    const events = await eventService.getAllEvents(locationId);
    console.log(events);
    setResponse(events, response, 200);
  }
  catch(Err)
  {
    console.log(Err);
    setErrorResponse(Err, response);
  }
};

//method to get a event by id 
export const getById = async (request, response) => {
  try
  {
    //Getting event id from request
    const id = request.params.eventId;
    const event = await eventService.getEventById(id);
    console.log(event);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    console.log(Err);
    setErrorResponse(Err, response);
  }
};

//method to create a event
export const create = async (request, response) => {
  try
  {
    //Creating a new event with location id and request body
    const newEvent = {...request.body, locationId: request.locationId};
    const event = await eventService.createEvent(newEvent);
    console.log(event);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    console.log(Err);
    setErrorResponse(Err, response);
  }
};

//method to update a event by id
export const updateById = async (request, response) => {
  try
  {
    //Getting event id from request
    const id = request.params.eventId;
    const newEvent = {...request.body};
    const event = await eventService.updateEventById(id, newEvent);
    console.log(event);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    console.log(Err);
    setErrorResponse(Err, response);
  }
};


//method to delete a event by id
export const deleteById = async (request, response) => {
  try
  {
    //Getting event id from request
    const id = request.params.eventId;
    const event = await eventService.deleteEventById(id);
    console.log(event);
    setResponse({}, response, 200);
  }
  catch(Err)
  {
    console.log(Err);
    setErrorResponse(Err, response);
  }
};
