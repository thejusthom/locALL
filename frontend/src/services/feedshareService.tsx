import axios from "axios";

const API_URL = "http://localhost:3001/location/";

const getFeedshare = async (locationId:string) => {
    const response = await axios.get(API_URL + "02115" +"/feedshare");
    return response.data;
};

const feedshareService = { getFeedshare };

export default feedshareService;