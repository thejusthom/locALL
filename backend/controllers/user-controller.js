import * as userService from "../services/user-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

// Method to get all users
export const get = async (request, response) => {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    userService.verifyAccessToken(accessToken);
    const users = await userService.getAll();
    setResponse(users, response, 200);
  } catch (err) {
    if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// Method to post or save the user
export const post = async (request, response) => {
  try {
    // const accessToken = request.headers.authorization.split(' ')[1];
    // userService.verifyAccessToken(accessToken);
    const newUser = { ...request.body };
    const user = await userService.save(newUser);
    setResponse(user, response, 200);
  } catch (err) {
    if (err._message === "User validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// Method to get an user by id
export const getById = async (request, response) => {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    userService.verifyAccessToken(accessToken);
    const id = request.params.id;
    const user = await userService.getById(id);
    setResponse(user, response, 200);
  } catch (err) {
    if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else if (err.name === "CastError") {
      response.status(400).json({ error: "Wrong variable Type" });
    } else {
      console.log(err.message);
      setErrorResponse(err, response);
    }
  }
};

// Method to get users by params
export const getByParams = async (request, response) => {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    userService.verifyAccessToken(accessToken);
    const params = { ...request.query };
    const users = await userService.getByParams(params);
    setResponse(users, response, 200);
  } catch (err) {
    if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// Method to update the user
export const update = async (request, response) => {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    const requestingUser = userService.verifyAccessToken(accessToken);
    if (requestingUser.id !== request.params.id) {
      throw new Error("You are not authorized to update this user");
    }
    // Getting id from request
    const id = request.params.id;
    const updatedUser = { ...request.body };
    const user = await userService.update(updatedUser, id);
    setResponse(user, response, 200);
  } catch (err) {
    if (err.message === "You are not authorized to update this user") {
      response
        .status(401)
        .json({ error: "You are not authorized to update this user" });
    } else if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else if (err._message === "User validation failed") {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

// Method to delete an user
export const remove = async (request, response) => {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    const requestingUser = userService.verifyAccessToken(accessToken);
    if (requestingUser.id !== request.params.id) {
      throw new Error("You are not authorized to delete this user");
    }
    // Getting id from request
    const id = request.params.id;
    const removedUser = await userService.remove(id);
    setResponse(removedUser, response, 200);
  } catch (err) {
    if (err.message === "You are not authorized to delete this user") {
      response
        .status(401)
        .json({ error: "You are not authorized to delete this user" });
    } else if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else {
      setErrorResponse(err, response);
    }
  }
};

//Method to validate login for a user
export const loginUser = async (request, response) => {
  try {
    const user = { ...request.body };
    const {
      user: validatedUser,
      accessToken,
      refreshToken,
    } = await userService.login(user);

    setResponse(
      { user: validatedUser, accessToken, refreshToken },
      response,
      200
    );
  } catch (err) {
    if (err.message === "User not found") {
      // Handle the case where the user is not found
      response.status(404).json({ error: "User not found" });
    } else {
      // Handle other errors
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

//Logout user
export const logout = async (request, response) => {
  try {
    const refreshToken = request.body.token;
    await userService.verifyRefreshToken(refreshToken);

    const accessToken = request.headers.authorization.split(" ")[1];
    const user = userService.verifyAccessToken(accessToken);
    await userService.logout(user.id);
    setResponse("Logout successful", response, 200);
  } catch (err) {
    if (err.message === "JWT token expired") {
      response.status(401).json({ error: "JWT token expired" });
    } else if (err.message === "Refresh token is not valid") {
      response.status(403).json({ error: "Refresh token is not valid" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};

//Get new access token
export const refreshTokens = async (request, response) => {
  try {
    const refreshToken = request.body.token;
    const tokens = await userService.refreshTokens(refreshToken);

    setResponse(tokens, response, 200);
  } catch (err) {
    if (err === "Refresh token is required") {
      response.status(401).json({ error: "Refresh token is required" });
    } else if (err === "Refresh token is not valid") {
      response.status(403).json({ error: "Refresh token is not valid" });
    } else {
      console.log(err);
      setErrorResponse(err, response);
    }
  }
};
