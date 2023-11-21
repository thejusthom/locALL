import { User } from '../models/index.js';

export const getAll = async () => {
    return User.find();
}

export const save = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

export const getById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

export const getByParams = async (params = {}) => {
    const users = await User.find(params).exec();
    return users;
}

export const update = async (updatedUser, id) => {
    const updated = await User.findByIdAndUpdate(id, updatedUser).exec();
    return updated;
}

export const remove = async (id) => {
    return await User.findByIdAndDelete(id).exec();
}