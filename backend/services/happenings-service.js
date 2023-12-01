import {Happening} from '../models/index.js';

//get all happenings
export const getAll = async (locationId) => {
    const location = {
        locationId
    }
    //to populate other user details in user object
    return Happening.find(location).populate('createdUser');
}

//save a happening
export const save = async (newHappening) => {
    const happening = new Happening(newHappening);
    console.log(newHappening);
    return happening.save();
}

//get a happening by id
export const getById = async (id) => {
    //to populate other user details in user object
    const happening = await Happening.findById(id).populate('createdUser');
    return happening;
}

//update a happening
export const update = async (updatedHappening, id) => {
    const updated = await Happening.findByIdAndUpdate(id, updatedHappening).exec();
    return updated;
}

//remove a happening
export const remove = async (id) => {
    return await Happening.findByIdAndDelete(id).exec();
}