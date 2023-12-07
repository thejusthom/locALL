import { User } from '../models/index.js';

// Get All Users using find method
export const getAll = async () => {
    return User.find();
}

// Add User to database using save method 
export const save = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

// Get a User by id using findById 
export const getById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

//Get users by providing params
export const getByParams = async (params = {}) => {
    const users = await User.find(params).exec();
    return users;
}

// Updating the user by giving id and updated body
export const update = async (updatedUser, id) => {
    const updated = await User.findByIdAndUpdate(id, updatedUser).exec();
    return updated;
}

// Deleting the user by providing id
export const remove = async (id) => {
    return await User.findByIdAndDelete(id).exec();
}

//Validating login
export const login = async (user) => {
    const foundUser = await User.findOne(user).exec();

    if (!foundUser) {
        throw new Error('User not found');
    }
    
    return foundUser;
}