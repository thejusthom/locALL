import * as userService from '../services/user-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const get = async(request, response) => {
    try{
        const users = await userService.getAll();
        setResponse(users, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}
export const post = async(request, response) => {
    try{
        const newUser = {...request.body};
        const user = await userService.save(newUser);
        setResponse(user,response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err,response);
    }
}


export const getById = async(request, response) => {
    try{
        const id = request.params.id;
        const user = await userService.getById(id);
        setResponse(user, response, 200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}


export const update = async(request, response) => {
    try{
        const id = request.params.id;
        const updatedUser = {...request.body};
        const user = await userService.update(updatedUser, id);
        setResponse(user, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}


export const remove = async(request, response) => {
    try{
        const id = request.params.id;
        const removedUser = await userService.remove(id);
        setResponse(removedUser, response,200);
    } catch(err){
        console.log(err);
        setErrorResponse(err, response)
    }
}

