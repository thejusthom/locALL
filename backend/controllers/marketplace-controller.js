import { response } from "express";
import * as marketplaceService from "../services/marketplace-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

export const find = async (request, response) => {
  try {
    const locationId = request.locationId;
    console.log(locationId);
    const marketplaces = await marketplaceService.getAll(locationId);
    console.log(marketplaces);
    if (marketplaces.length == 0) {
      throw new Error("Marketplaces not found");
    }
    setResponse(marketplaces, response, 200);
  } catch (err) {
    if (err.message === "Marketplaces not found") {
      response.status(404).json({ error: "Marketplaces not found" });
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
    const marketplaces = await marketplaceService.getByParams(params);
    if (marketplaces.length == 0) {
      throw new Error("Marketplaces not found");
    }
    setResponse(marketplaces, response, 200);
  } catch (err) {
    if (err.message === "Marketplaces not found") {
      response.status(404).json({ error: "Marketplaces not found" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

export const post = async (request, response) => {
  try {
    console.log(request.locationId);
    const newMarketplace = { ...request.body, locationId: request.locationId };
    // console.log(newMarketplace);
    const marketplace = await marketplaceService.save(newMarketplace);
    setResponse(marketplace, response, 200);
  } catch (err) {
    if (err._message === "User validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const marketplace = await marketplaceService.find(id);
    if (!marketplace) {
      throw new Error("Marketplace not found");
    }
    setResponse(marketplace, response, 200);
  } catch (err) {
    if (err.message === "Marketplace not found") {
      // Handle the case where the marketplace is not found
      response.status(404).json({ error: "Marketplace not found" });
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
    const updatedMarketplace = { ...request.body };
    const marketplace = await marketplaceService.update(updatedMarketplace, id);
    if (!marketplace) {
      throw new Error("Marketplace not found");
    }
    setResponse(marketplace, response, 200);
  } catch (err) {
    if (err.message === "Marketplace not found") {
      // Handle the case where the marketplace is not found
      response.status(404).json({ error: "Marketplace not found" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const marketplace = await marketplaceService.remove(id);
    if (!marketplace) {
      throw new Error("Marketplace not removed");
    }
    setResponse(marketplace, response, 200);
  } catch (err) {
    if (err.message === "Marketplace not found") {
      // Handle the case where the marketplace is not removed
      response.status(404).json({ error: "Marketplace not removed" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};
