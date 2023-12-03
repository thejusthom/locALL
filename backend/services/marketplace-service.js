import Marketplace from '../models/marketplace.js';

export const search = async (params = {}) => {
    const marketplace = await Marketplace.find(params).exec();
    return marketplace;
}

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

export const save = async (newMarketplace) => {
    const marketplace = new Marketplace(newMarketplace);
    // console.log(marketplace);
    return marketplace.save();
}

export const find = async (id) => {
    const marketplace = await Marketplace.findById(id).populate('createdUser');
    return marketplace;
}

export const update = async (updatedMarketplace, id) => {
    const marketplace = await Marketplace.findByIdAndUpdate(id, updatedMarketplace).exec();
    return marketplace;
}

export const remove = async (id) => {
    return await Marketplace.findByIdAndDelete(id).exec()
}