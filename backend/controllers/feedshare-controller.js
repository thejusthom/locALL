import e, { response } from "express";
import * as feedshareService from "../services/feedshare-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

/**
 * Find feedshares based on locationId.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const find = async (request, response) => {
  try {
    const locationId = request.locationId;
    console.log(locationId);
    const feedshares = await feedshareService.getAll(locationId);
    // console.log(feedshares);
    setResponse(feedshares, response, 200);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};

/**
 * Handles the POST request for creating a new feedshare.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const post = async (request, response) => {
  try {
    console.log(request.locationId);
    const newFeedShare = {
      ...request.body,
      locationId: request.locationId,
      listingDate: Date.now(),
    };
    // console.log(newFeedShare);
    const feedshare = await feedshareService.save(newFeedShare);
    if (!feedshare) {
      throw new Error("feedshare not created");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not created") {
      response.status(400).json({ error: "feedshare not created" });
    } else if (err._message === "feedshare validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

/**
 * Retrieves a feedshare by its ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the feedshare is retrieved.
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const feedshare = await feedshareService.find(id);
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

/**
 * Updates a feedshare by its ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the feedshare is updated.
 * @throws {Error} - If the feedshare is not found or if there is a validation error.
 */
export const put = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedFeedShare = { ...request.body };
    const feedshare = await feedshareService.update(updatedFeedShare, id);
    if (!feedshare) {
      throw new Error("feedshare not found");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not found") {
      response.status(404).json({ error: "feedshare not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else if (err._message === "feedshare validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

/**
 * Removes a feedshare by its ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the feedshare is removed.
 * @throws {Error} - If the feedshare is not removed.
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const feedshare = await feedshareService.remove(id);
    if (!feedshare) {
      throw new Error("feedshare not removed");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not removed") {
      response.status(404).json({ error: "feedshare not removed" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

/**
 * Searches for feedshare based on the provided parameters.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the search is complete.
 */
export const search = async (request, response) => {
  try {
    const params = request.query;
    const feedshare = await feedshareService.search(params);
    setResponse(feedshare, response, 200);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};

/**
 * Retrieves feedshare data based on the provided parameters.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the feedshare data is retrieved.
 */
export const getByParams = async (request, response) => {
  try {
    const locationId = request.locationId;
    const params = { ...request.query, locationId };
    console.log(params);
    const feedshare = await feedshareService.getByParams(params);
    setResponse(feedshare, response, 200);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};
