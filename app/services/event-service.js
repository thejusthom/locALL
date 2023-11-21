import eventModel from "../models/event.js";

export const getAllEvents = async (params = {}) => {
const event = await eventModel.find(params).exec();
return event;
};

export const getEventById = async (id) => {
const event = await eventModel.findById(id).exec();
return event;
};

export const createEvent = async (newEvent) => {
  const event = new eventModel(newEvent);
  return event.save();
};

export const updateEventById = async (id, updatedEvent) => {
  const event = await eventModel.findByIdAndUpdate(id, updatedEvent, {new:true}).exec();
  return event;
};

export const deleteEventById = async (id) => {
 const event = await eventModel.findByIdAndDelete(id).exec();
 return event;
};

