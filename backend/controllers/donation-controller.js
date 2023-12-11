import * as donationService from "../services/donation-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

//method to get all happenings for a location
export const get = async (request, response) => {
  try {
    //getting the locationId from request
    const locationId = request.locationId;
    const donations = await donationService.getAll(locationId);
    if (donations.length == 0) {
      throw new Error("Donations not found");
    }
    setResponse(donations, response, 200);
  } catch (err) {
    if (err.message === "Donations not found") {
      response.status(404).json({ error: "Donations not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to post a happening in a location
export const post = async (request, response) => {
  try {
    const newDonation = {
      ...request.body,
      locationId: request.locationId,
      postedOn: Date.now(),
    };
    console.log(newDonation);
    const donation = await donationService.save(newDonation);
    if (!donation) {
      throw new Error("Donation not created");
    }
    setResponse(donation, response, 200);
  } catch (err) {
    if (err.message === "Donation not created") {
      response.status(404).json({ error: "Donation not created" });
    } else if (err.name === "donation validation failed") {
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
    const id = request.params.donationId;
    const donation = await donationService.getById(id);
    if (!donation) {
      throw new Error("Donation not found");
    }
    setResponse(donation, response, 200);
  } catch (err) {
    if (err.message === "Donation not found") {
      response.status(404).json({ error: "Donation not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// Method to get users by params
export const getByParams = async (request, response) => {
  try {
    const locationId = request.locationId;
    const params = { ...request.query, locationId };
    console.log(params);
    const donations = await donationService.getByParams(params);
    if (donations.length == 0) {
      throw new Error("Donations not found");
    }
    setResponse(donations, response, 200);
  } catch (err) {
    if (err.message === "Donations not found") {
      response.status(404).json({ error: "Donations not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// method to update a happening
export const update = async (request, response) => {
  try {
    const id = request.params.donationId;
    const updatedDonation = { ...request.body, postedDate: Date.now() };
    const donation = await donationService.update(updatedDonation, id);
    if (!donation) {
      throw new Error("Donation not found");
    }
    setResponse(donation, response, 200);
  } catch (err) {
    if (err.message === "Donation not found") {
      response.status(404).json({ error: "Donation not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else if (err.name === "donation validation failed") {
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
    const id = request.params.donationId;
    const removedDonation = await donationService.remove(id);
    if (!removedDonation) {
      throw new Error("Donation not deleted");
    }
    setResponse(removedDonation, response, 200);
  } catch (err) {
    if (err.message === "Donation not deleted") {
      response.status(404).json({ error: "Donation not deleted" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};
