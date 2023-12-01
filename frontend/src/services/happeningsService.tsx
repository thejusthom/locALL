import axios from "axios";
import Happenings from "../models/happenings";

const baseURL = "http://localhost:3001/location/";

const getAllHappenings = async (locationId: string) => {
  const response = await axios.get(baseURL + locationId + '/happenings');
  return response.data;
}

const happeningsService = { getAllHappenings };
export default happeningsService;