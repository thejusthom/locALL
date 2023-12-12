import e, { response } from "express";
import * as feedshareService from "../services/feedshare-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

export const find = async (request, response) => {
  try {
    const locationId = request.locationId;
    console.log(locationId);
    const feedshares = await feedshareService.getAll(locationId);
    if (feedshares.length == 0) {
      throw new Error("Feedshares not found");
    }
    // console.log(feedshares);
    setResponse(feedshares, response, 200);
  } catch (err) {
    if (err.message === "Feedshares not found") {
      response.status(404).json({ error: "Feedshares not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

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
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err._message === "feedshare validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const feedshare = await feedshareService.find(id);
    if (!feedshare) {
      throw new Error("feedshare not found");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not found") {
      response.status(404).json({ error: "feedshare not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

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

export const search = async (request, response) => {
  try {
    const params = request.query;
    const feedshare = await feedshareService.search(params);
    if (!feedshare) {
      throw new Error("feedshare not found");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not found") {
      response.status(404).json({ error: "feedshare not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

export const getByParams = async (request, response) => {
  try {
    const locationId = request.locationId;
    const params = { ...request.query, locationId };
    console.log(params);
    const feedshare = await feedshareService.getByParams(params);
    if (!feedshare) {
      throw new Error("feedshare not found");
    }
    setResponse(feedshare, response, 200);
  } catch (err) {
    if (err.message === "feedshare not found") {
      response.status(404).json({ error: "feedshare not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};
