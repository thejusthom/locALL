import * as donationService from '../services/donation-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

//method to get all happenings for a location
export const get = async(request, response) => {
    try{
        //getting the locationId from request
        const locationId = request.locationId;
        const donations = await donationService.getAll(locationId);
        setResponse(donations, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

// method to post a happening in a location
export const post = async(request, response) => {
    try{
        const newDonation = {...request.body, locationId: request.locationId, postedOn: Date.now()};
        console.log(newDonation);
        const donation = await donationService.save(newDonation);
        setResponse(donation, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err,response);
    }
}

// method to get a happening
export const getById = async(request, response) => {
    try{
        const id = request.params.donationId;
        const donation = await donationService.getById(id);
        setResponse(donation, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}

// Method to get users by params
export const getByParams = async (request, response) => {
    try {
        const locationId = request.locationId;
        const params = { ...request.query, locationId };
        console.log(params);
        const donations = await donationService.getByParams(params);
        setResponse(donations, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
  }

// method to update a happening
export const update = async(request, response) => {
    try{
        const id = request.params.donationId;
        const updatedDonation = {...request.body, postedDate: Date.now()};
        const donation = await donationService.update(updatedDonation, id);
        setResponse(donation, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

// method to delete a happening
export const remove = async(request, response) => {
    try{
        const id = request.params.donationId;
        const removedDonation = await donationService.remove(id);
        setResponse(removedDonation, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

