import * as happeningService from '../services/happenings-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

//method to get all happenings for a location
export const get = async(request, response) => {
    try{
        //getting the locationId from request
        const locationId = request.locationId;
        const happenings = await happeningService.getAll(locationId);
        setResponse(happenings, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

// method to post a happening in a location
export const post = async(request, response) => {
    try{
        const newHappening = {...request.body, locationId: request.locationId, postedDate: Date.now()};
        console.log(newHappening);
        const happening = await happeningService.save(newHappening);
        setResponse(happening,response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err,response);
    }
}

// method to get a happening
export const getById = async(request, response) => {
    try{
        const id = request.params.happeningId;
        const happening = await happeningService.getById(id);
        setResponse(happening, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}

// method to update a happening
export const update = async(request, response) => {
    try{
        const id = request.params.happeningId;
        const updatedHappening = {...request.body, postedDate: Date.now()};
        const happening = await happeningService.update(updatedHappening, id);
        setResponse(happening, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

// method to delete a happening
export const remove = async (request, response) => {
    try{
        const id = request.params.happeningId;
        const removedHappening = await happeningService.remove(id);
        setResponse(removedHappening, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response);
    }
}

// method to get happenings by params
export const getHappeningsByParams = async (request, response) => {
    try
    {
        const locationId = request.locationId;
        const params = {...request.query, locationId};
        console.log(params);
        const happeningsByParams = await happeningService.getHappeningsByParams(params);
        setResponse(happeningsByParams, response, 200);
    }
    catch(err)
    {
        console.log(err);
        setErrorResponse(err, response);
    }
};

