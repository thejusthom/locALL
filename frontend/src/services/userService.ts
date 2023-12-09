import axios from "axios";
import {IUser} from "../models/user";

const baseURL = "http://localhost:3001/users/";

const createUser = async (newUser: IUser) => {
  const response = await axios.post(baseURL, newUser);
  return response.data;
}

const loginUser = async (user: IUser) => {
  const response = await axios.post(baseURL + '/login', user);
  return response.data;
}

const updateUser = async (user: IUser) => {
  const response = await axios.put(baseURL + '/' + user._id, user);
  return response.data;
}

const userService = { createUser, loginUser, updateUser };

export default userService;