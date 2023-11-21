import {Happening} from '../models/index.js';

export const getAll = async (locationId) => {
    const location = {
        locationId
    }
    return Happening.find(location).populate('userId');
}

export const save = async (newHappening) => {
        const happening = new Happening(newHappening);
        console.log(newHappening);
        return happening.save();
}

export const getById = async (id) => {
    const happening = await Happening.findById(id).populate('userId');
    return happening;
}

export const update = async (updatedHappening, id) => {
    const updated = await Happening.findByIdAndUpdate(id, updatedHappening).exec();
    return updated;
}

export const remove = async (id) => {
    return await Happening.findByIdAndDelete(id).exec();
}