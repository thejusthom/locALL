import * as happeningService from "../services/happenings-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

//method to get all happenings for a location
export const get = async (request, response) => {
  try {
    //getting the locationId from request
    const locationId = request.locationId;
    const happenings = await happeningService.getAll(locationId);
    if (happenings.length == 0) {
      throw new Error("Happenings not found");
    }
    setResponse(happenings, response, 200);
  } catch (err) {
    if (err.message === "Happenings not found") {
      response.status(404).json({ error: "Happenings not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to post a happening in a location
export const post = async (request, response) => {
  try {
    const newHappening = {
      ...request.body,
      locationId: request.locationId,
      postedDate: Date.now(),
    };
    console.log(newHappening);
    const happening = await happeningService.save(newHappening);
    setResponse(happening, response, 200);
  } catch (err) {
    if (err._message === "Happening validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to get a happening
export const getById = async (request, response) => {
  try {
    const id = request.params.happeningId;
    const happening = await happeningService.getById(id);
    if (!happening) {
      throw new Error("Happening not found");
    }
    setResponse(happening, response, 200);
  } catch (err) {
    if (err.message === "Happening not found") {
      response.status(404).json({ error: "Happening not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to update a happening
export const update = async (request, response) => {
  try {
    const id = request.params.happeningId;
    const updatedHappening = { ...request.body, postedDate: Date.now() };
    const happening = await happeningService.update(updatedHappening, id);
    if (!happening) {
      throw new Error("Happening not found");
    }
    setResponse(happening, response, 200);
  } catch (err) {
    if (err.message === "Happening not found") {
      response.status(404).json({ error: "Happening not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else if (err._message === "Happening validation failed") {
        response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to delete a happening
export const remove = async (request, response) => {
  try {
    const id = request.params.happeningId;
    const removedHappening = await happeningService.remove(id);
    if (!removedHappening) {
      throw new Error("Happening not removed");
    }
    setResponse(removedHappening, response, 200);
  } catch (err) {
    if (err.message === "Happening not removed") {
      response.status(404).json({ error: "Happening not removed" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to get happenings by params
export const getHappeningsByParams = async (request, response) => {
  try {
    const locationId = request.locationId;
    const params = { ...request.query, locationId };
    console.log(params);
    const happeningsByParams = await happeningService.getHappeningsByParams(
      params
    );
    if (happeningsByParams.length == 0) {
      throw new Error("Happenings not found");
    }
    setResponse(happeningsByParams, response, 200);
  } catch (err) {
    if (err.message === "Happenings not found") {
      response.status(404).json({ error: "Happenings not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};
