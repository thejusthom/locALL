import * as userService from '../services/user-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Method to get all users
export const get = async (request, response) => {
    try {
        const users = await userService.getAll();
        console.log(users);
        setResponse(users, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

// Method to post or save the user
export const post = async (request, response) => {
    try {
        const newUser = { ...request.body };
        const user = await userService.save(newUser);
        setResponse(user, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

// Method to get an user by id
export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userService.getById(id);
        setResponse(user, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

// Method to get users by params
export const getByParams = async (request, response) => {
    try {
        const params = { ...request.query };
        const users = await userService.getByParams(params);
        setResponse(users, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response);
    }
}

// Method to update the user
export const update = async (request, response) => {
    try {
        // Getting id from request
        const id = request.params.id;
        const updatedUser = { ...request.body };
        const user = await userService.update(updatedUser, id);
        setResponse(user, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response)
    }
}

// Method to delete an user
export const remove = async (request, response) => {
    try {
        // Getting id from request
        const id = request.params.id;
        const removedUser = await userService.remove(id);
        setResponse(removedUser, response, 200);
    } catch (err) {
        console.log(err);
        setErrorResponse(err, response)
    }
}

//Method to validate login for a user
export const loginUser = async (request, response) => {
    try {
        const user = { ...request.body };
        const validatedUser = await userService.login(user);
        setResponse(validatedUser, response, 200);
    } catch (err) {
        if (err.message === 'User not found') {
            // Handle the case where the user is not found
            response.status(404).json({ error: 'User not found' });
        } else {
            // Handle other errors
            console.log(err);
            setErrorResponse(err, response);
        }
    }
}

