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

const happeningsService = { getAllHappenings, getHappeningById };
export default happeningsService;