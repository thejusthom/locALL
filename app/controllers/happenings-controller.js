import * as happeningService from '../services/happenings-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const get = async(request, response) => {
    try{
        const locationId = request.locationId;
        // const locationId = request.params.locationId;
        const happenings = await happeningService.getAll(locationId);
        console.log(locationId);
        setResponse(happenings, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}
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


export const update = async(request, response) => {
    try{
        const id = request.params.happeningId;
        const updatedHappening = {...request.body};
        const happening = await happeningService.update(updatedHappening, id);
        setResponse(happening, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}


export const remove = async(request, response) => {
    try{
        const id = request.params.happeningId;
        const removedHappening = await happeningService.remove(id);
        setResponse(removedHappening, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}

