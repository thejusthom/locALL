import axios from "axios";
import { Marketplace } from "../models/marketplace";

const API_URL = "http://localhost:3001/location/";

const getMarketplace = async (locationId:string) => {
    const response = await axios.get(API_URL + locationId +"/marketplace");
    return response.data;
};
const getMarketplaceByParams = async (locationId:string,createdUser:string) => {
    const params = {createdUser};
    const response = await axios.get(API_URL + locationId +"/marketplace/params",{params});
    return response.data;
};
const updateMarketplace = async (locationId:string,body:Marketplace,_id:string) => {
    const response = await axios.put(API_URL + locationId +"/marketplace/"+_id,body);
    return response.data;
};
const createMarketplace = async (locationId:string,body:Marketplace) => {
    const response = await axios.post(API_URL + locationId +"/marketplace/",body);
    return response.data;
};

const deleteMarketplace = async (locationId:string,_id:string) => {
    const response = await axios.delete(API_URL + locationId +"/marketplace/"+_id);
    return response.data;
};

const marketplaceService = { getMarketplace , updateMarketplace, getMarketplaceByParams, createMarketplace, deleteMarketplace};
export default marketplaceService;