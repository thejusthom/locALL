import { response } from 'express';
import * as marketplaceService from '../services/marketplace-service.js';
import {setResponse,setErrorResponse} from './response-handler.js';

export const find = async (request, response) => {

    try {
        const locationId = request.locationId;
        console.log(locationId);
        const marketplaces =  await (marketplaceService.getAll(locationId));
        // console.log(marketplaces);
        setResponse(marketplaces, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        console.log(request.locationId);
        const newMarketplace = {...request.body, locationId: request.locationId, listingDate: Date.now()};
        // console.log(newMarketplace);
        const marketplace = await marketplaceService.save(newMarketplace);
        setResponse(marketplace, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const marketplace = await marketplaceService.find(id);
        setResponse(marketplace, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedMarketplace = {...request.body};
        const marketplace = await marketplaceService.update(updatedMarketplace,id);
        setResponse(marketplace, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const marketplace = await marketplaceService.remove(id);
        setResponse(marketplace, response, 200);
    }
    catch (err) {
        console.log(err);
        setErrorResponse(err,response);   
    }
}