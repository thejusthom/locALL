import axios from "axios";
import { Marketplace } from "../models/marketplace";

const API_URL = "http://localhost:3001/location/";

const getMarketplace = async (locationId:string) => {
    const response = await axios.get(API_URL + locationId +"/marketplace");
    return response.data;
};
const updateMarketplace = async (locationId:string,body:Marketplace,_id:number) => {
    const response = await axios.put(API_URL + locationId +"/marketplace/"+_id,body);
    return response.data;
};

const marketplaceService = { getMarketplace , updateMarketplace};
export default marketplaceService;