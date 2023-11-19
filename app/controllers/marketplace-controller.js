import { response } from 'express';
import * as marketplaceService from '../services/marketplace-service.js';
import {setResponse,setErrorResponse} from './response-handler.js';

export const find = (request, response) => {
    try {
        const params = {...request.query};
        const marketplaces = (marketplaceService.search(params));
        setResponse(marketplaces, response);
    }
    catch (err) {
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const newMarketplace = {...request.body};
        const marketplace = await marketplaceService.save(newMarketplace);
        setResponse(marketplace, response);
    }
    catch (err) {
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const marketplace = await marketplaceService.find(id);
        setResponse(marketplace, response);
    }
    catch (err) {
        setErrorResponse(err,response);   
    }
}

export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedMarketplace = {...request.body};
        const marketplace = await marketplaceService.update(updatedMarketplace,id);
        setResponse(marketplace, response);
    }
    catch (err) {
        setErrorResponse(err,response);   
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const marketplace = await marketplaceService.remove(id);
        setResponse({}, response);
    }
    catch (err) {
        setErrorResponse(err,response);   
    }
}