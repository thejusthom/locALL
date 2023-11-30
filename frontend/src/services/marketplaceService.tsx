import axios from "axios";

const API_URL = "http://localhost:3001/location/";

const getMarketplace = async (locationId:string) => {
    const response = await axios.get(API_URL + locationId +"/marketplace");
    return response.data;
};

const marketplaceService = { getMarketplace };
export default marketplaceService;