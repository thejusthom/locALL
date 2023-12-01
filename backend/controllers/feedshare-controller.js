import { response } from 'express';
import * as feedshareService from '../services/feedshare-service.js';
import {setResponse,setErrorResponse} from './response-handler.js';

export const find = async (request, response) => {
    
        try {
            const locationId = request.locationId;
            console.log(locationId);
            const feedshares =  await (feedshareService.getAll(locationId));
            // console.log(feedshares);
            setResponse(feedshares, response, 200);
        }
        catch (err) {
            console.log(err);
            setErrorResponse(err, response);
        }
    }

export const post = async (request, response) => {
    try {
        console.log(request.locationId);
        const newFeedShare = {...request.body, locationId: request.locationId, listingDate: Date.now()};
        // console.log(newFeedShare);
        const feedshare = await feedshareService.save(newFeedShare);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const feedshare = await feedshareService.find(id);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedFeedShare = {...request.body};
        const feedshare = await feedshareService.update(updatedFeedShare,id);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const feedshare = await feedshareService.remove(id);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const search = async (request, response) => {
    try {
        const params = request.query;
        const feedshare = await feedshareService.search(params);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const getFeedShareByLocation = async (request, response) => {
    try {
        const locationId = request.params.locationId;
        const feedshare = await feedshareService.getFeedShareByLocation(locationId);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const getFeedShareByUser = async (request, response) => {
    try {
        const userId = request.params.userId;
        const feedshare = await feedshareService.getFeedShareByUser(userId);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const getFeedShareByLocationAndUser = async (request, response) => {
    try {
        const locationId = request.params.locationId;
        const userId = request.params.userId;
        const feedshare = await feedshareService.getFeedShareByLocationAndUser(locationId, userId);
        setResponse(feedshare, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

