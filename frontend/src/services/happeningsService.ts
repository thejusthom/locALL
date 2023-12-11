import axios from "axios";
import Happenings from "../models/happenings";

const baseURL = "http://localhost:3001/location/";

const getAllHappenings = async (locationId: string) => {
  const response = await axios.get(baseURL + locationId + '/happenings');
  return response.data;
}

const getHappeningById = async (locationId: string, happeningId: string) => {
  const response = await axios.get(baseURL + locationId + '/happenings/' + happeningId);
  return response.data;
}

const createHappening = async (locationId: string, newHappening: Happenings) => {
  const response = await axios.post(baseURL + locationId + '/happenings', newHappening);
  return response.data;
};

const updateHappening = async (locationId: string, happeningId: string, newHappening: Happenings) => {
  const response = await axios.put(baseURL + locationId + '/happenings/' + happeningId, newHappening);
  return response.data;
}

const deleteHappening = async (locationId: string, happeningId: string) => {
  const response = await axios.delete(baseURL + locationId + '/happenings/' + happeningId);
  return response.data;
}

const getHappeningsByParams = async (locationId: string, createdUser: string) => {
  const params = {createdUser};
  const response = await axios.get(baseURL + locationId + '/happenings/params', {params});
  return response.data;
}

const happeningsService = { getAllHappenings, getHappeningById, createHappening, updateHappening, deleteHappening, getHappeningsByParams };
export default happeningsService;