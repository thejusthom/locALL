import Marketplace from '../models/marketplace.js';

// Get marketplace by providing params
export const search = async (params = {}) => {
    const marketplace = await Marketplace.find(params).exec();
    return marketplace;
}

// Get all marketplaces
export const getAll = async (locationId) => {
    const location = {
        locationId
    }
    return Marketplace.find(location).populate('createdUser');
}

//Get marketplace by providing params
export const getByParams = async (params = {}) => {
    const marketplaces = await Marketplace.find(params).populate('createdUser');
    return marketplaces;
}

// Save marketplace to database
export const save = async (newMarketplace) => {
    const marketplace = new Marketplace(newMarketplace);
    return marketplace.save();
}

// Get marketplace by id
export const find = async (id) => {
    const marketplace = await Marketplace.findById(id).populate('createdUser');
    return marketplace;
}

// Update marketplace by id
export const update = async (updatedMarketplace, id) => {
    const marketplace = await Marketplace.findByIdAndUpdate(id, updatedMarketplace).exec();
    return marketplace;
}

// Delete marketplace by id
export const remove = async (id) => {
    return await Marketplace.findByIdAndDelete(id).exec()
}