import axios from "axios";
import FeedShare from "../models/feedShare";

const API_URL = "http://localhost:3001/location/";

const getFeedshare = async (locationId:string) => {
    const response = await axios.get(API_URL + locationId +"/feedshare");
    return response.data;
};

const getFeedshareById = async (locationId:string, _id:number) => {
    const response = await axios.get(API_URL + locationId +"/feedshare/"+_id);
    return response.data;
}

const getFeedshareByUser = async (locationId:string, createdUser:string) => {
    const params = {createdUser};
    const response = await axios.get(API_URL + locationId +"/feedshare/params",{params});
    return response.data;
}

const updateFeedshare = async (locationId:string,body:FeedShare,_id:number) => {
    const response = await axios.put(API_URL + locationId +"/feedshare/"+_id,body);
    return response.data;
}

const createFeedshare = async (locationId:string,body:FeedShare) => {
    const response = await axios.post(API_URL + locationId +"/feedshare",body);
    return response.data;
}

const deleteFeedshare = async (locationId:string,_id:number) => {    
    const response = await axios.delete(API_URL + locationId +"/feedshare/"+_id);
    return response.data;
}


const feedshareService = { getFeedshare, getFeedshareById, updateFeedshare, createFeedshare, getFeedshareByUser, deleteFeedshare};

export default feedshareService;