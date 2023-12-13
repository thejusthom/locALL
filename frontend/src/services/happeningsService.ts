// Import axios library for making HTTP requests
import axios from "axios";
// Import Happenings model
import Happenings from "../models/happenings";

// Define the base URL for the API
const baseURL = "http://localhost:3001/location/";

// Function to get all happenings for a specific location
const getAllHappenings = async (locationId: string) => {
  const response = await axios.get(baseURL + locationId + '/happenings');
  return response.data;
}

// Function to get a specific happening by its ID
const getHappeningById = async (locationId: string, happeningId: string) => {
  const response = await axios.get(baseURL + locationId + '/happenings/' + happeningId);
  return response.data;
}

// Function to create a new happening for a specific location
const createHappening = async (locationId: string, newHappening: Happenings) => {
  const response = await axios.post(baseURL + locationId + '/happenings', newHappening);
  return response.data;
};

// Function to update an existing happening for a specific location
const updateHappening = async (locationId: string, happeningId: string, newHappening: Happenings) => {
  const response = await axios.put(baseURL + locationId + '/happenings/' + happeningId, newHappening);
  return response.data;
}

// Function to delete a happening for a specific location
const deleteHappening = async (locationId: string, happeningId: string) => {
  const response = await axios.delete(baseURL + locationId + '/happenings/' + happeningId);
  return response.data;
}

// Function to get happenings for a specific location based on parameters
const getHappeningsByParams = async (locationId: string, createdUser: string) => {
  const params = {createdUser};
  const response = await axios.get(baseURL + locationId + '/happenings/params', {params});
  return response.data;
}

// Export all the functions as a single object
const happeningsService = { getAllHappenings, getHappeningById, createHappening, updateHappening, deleteHappening, getHappeningsByParams };
export default happeningsService;