import Marketplace from '../models/marketplace.js';

export const search = async (params = {}) => {
    const marketplace = await Marketplace.find(params).exec();
    return marketplace;
}

export const save = async (newMarketplace) => {
    const marketplace = new Marketplace(newMarketplace);
    return marketplace.save();
}

export const find = async (id) => {
    const marketplace = await Marketplace.findById(id).exec();
    return marketplace;
}

export const update = async (updatedMarketplace, id) => {
    const marketplace = await Marketplace.findByIdAndUpdate(id, updatedMarketplace).exec();
    return marketplace;
}

export const remove = async (id) => {
    return await Marketplace.findByIdAndDelete(id).exec()
}