import eventModel from "../models/event.js";

//GET all events
export const getAllEvents = async (locationId) => {
  const location = {
    locationId
  }
//to populate other user details in user object
const event = await eventModel.find(location).populate('createdUser');
return event;
};

//GET event by id
export const getEventById = async (id) => {
//to populate other user details in user object
const event = await eventModel.findById(id).populate('createdUser');
return event;
};

//POST Create a event
export const createEvent = async (newEvent) => {
  const event = new eventModel(newEvent);
  event.populate('createdUser');
  return await event.save();
};

//PUT Update a event
export const updateEventById = async (id, updatedEvent) => {
  const event = await eventModel.findByIdAndUpdate(id, updatedEvent, {new:true}).populate('createdUser').exec();
  return event;
};

//DELETE a event
export const deleteEventById = async (id) => {
 const event = await eventModel.findByIdAndDelete(id).exec();
 return event;
};

