import axios from "axios";
import { IDonation } from "../models/donation";

const API_URL = "http://localhost:3001/location/";

//fetch donations
const getDonations = async (locationId: string) => {
    const response = await axios.get(API_URL + locationId +"/donations");
    return response.data;
};

//get donation by id
const getDonationById = async (locationId: string, donationId: string) => {
    const response = await axios.get(API_URL + locationId +"/donations/"+donationId);
    return response.data;
};

//get donation by params like createdUser
const getDonationByParams = async (locationId:string,createdUser:string) => {
    const params = new URLSearchParams([['createdUser', createdUser]]);
    const response = await axios.get(API_URL + locationId +"/donations/params",{params});
    return response.data;
};

//post a donation
const createDonation = async (locationId: string, newDonation: IDonation) => {
    const response = await axios.post(API_URL + locationId +"/donations", newDonation);
    return response.data;
};

//update a donation
const updateDonation = async (locationId: string, donationId: string, updatedDonation: IDonation) => {
    const response = await axios.put(API_URL + locationId +"/donations/" + donationId, updatedDonation);
    return response.data;
};

// delete a donation
const deleteDonation = async (locationId: string, donationId: string) => {
    const response = await axios.delete(API_URL + locationId +"/donations/" + donationId);
    return response.data;
};

const donationService = { getDonations, getDonationById, getDonationByParams, createDonation, updateDonation, deleteDonation };
export default donationService;