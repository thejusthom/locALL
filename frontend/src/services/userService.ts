import axios from "axios";
import {IUser} from "../models/user";

const baseURL = "http://localhost:3001/users/";

const createUser = async (newUser: IUser) => {
  const response = await axios.post(baseURL, newUser);
  return response.data;
}

const loginUser = async (user: IUser) => {
  const response = await axios.post(baseURL + '/login', user);
  console.log(response.data);
  return response.data;
}

const updateUser = async (user: IUser, refreshToken: string) => {
  const tokens = await refreshTokenGenerate(refreshToken);
  // Create a new object by spreading the properties of the existing user object
  const updatedUser = { ...user, accessToken: tokens.accessToken };
  console.log(updatedUser);
  const response = await axios.put(baseURL + '/' + user._id, updatedUser, {
    headers: 
    {
      authorization: `Bearer ${updatedUser.accessToken}`
    }
  });
  return response.data;
}

const refreshTokenGenerate = async (refreshToken: string) => {
  const response = await axios.post(baseURL + 'refresh-token', {token: refreshToken});
  return response.data;
}

const logoutUser = async (user: IUser, refreshToken: string) => {
  const tokens = await refreshTokenGenerate(refreshToken);
  // Create a new object by spreading the properties of the existing user object
  const updatedUser = { ...user, accessToken: tokens.accessToken };
  console.log(tokens);
    const response = await axios.post(baseURL + '/logout', {token: tokens.refreshToken},
  {
    headers: 
    {
      authorization: `Bearer ${updatedUser.accessToken}`
    }
  });
  return response.data;
}

const userService = { createUser, loginUser, updateUser, refreshTokenGenerate, logoutUser };

export default userService;