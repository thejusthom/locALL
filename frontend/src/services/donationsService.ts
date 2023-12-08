import axios from "axios";
import { IDonation } from "../models/donation";

const API_URL = "http://localhost:3001/location/";

const getDonations = async (locationId: string) => {
    const response = await axios.get(API_URL + locationId +"/donations");
    return response.data;
};

const getDonationById = async (locationId: string, donationId: string) => {
    const response = await axios.get(API_URL + locationId +"/donations/"+donationId);
    return response.data;
};

const createDonation = async (locationId: string, newDonation: IDonation) => {
    const response = await axios.post(API_URL + locationId +"/donations", newDonation);
    return response.data;
};

const updateDonation = async (locationId: string, donationId: string, updatedDonation: IDonation) => {
    const response = await axios.put(API_URL + locationId +"/donations/" + donationId, updatedDonation);
    return response.data;
};

const deleteDonation = async (locationId: string, donationId: string) => {
    const response = await axios.delete(API_URL + locationId +"/donations/" + donationId);
    return response.data;
};

const donationService = { getDonations, getDonationById, createDonation, updateDonation, deleteDonation };
export default donationService;