import * as eventService from '../services/event-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const getAll = async (request, response) => {
  try
  {
    const events = await eventService.getAllEvents({});
    setResponse(events, response, 200);
  }
  catch(Err)
  {
    setErrorResponse(Err, response);
  }
};

export const getById = async (request, response) => {
  try
  {
    const id = request.params.id;
    const event = await eventService.getEventById(id);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    setErrorResponse(Err, response);
  }
};

export const create = async (request, response) => {
  try
  {
    const newEvent = {...request.body};
    const event = await eventService.createEvent(newEvent);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    setErrorResponse(Err, response);
  }
};

export const updateById = async (request, response) => {
  try
  {
    const id = request.params.id;
    const newEvent = {...request.body}
    const event = await eventService.updateEventById(id, newEvent);
    setResponse(event, response, 200);
  }
  catch(Err)
  {
    setErrorResponse(Err, response);
  }
};

export const deleteById = async (request, response) => {
  try
  {
    const id = request.params.id;
    const event = await eventService.deleteEventById(id);
    setResponse({}, response, 200);
  }
  catch(Err)
  {
    setErrorResponse(Err, response);
  }
};
