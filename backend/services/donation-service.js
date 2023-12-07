import {Donation} from '../models/index.js';

//get all donations
export const getAll = async (locationId) => {
    const location = {
        locationId
    }
    //to populate other user details in user object
    return Donation.find(location).populate('createdUser');
}

//save a donation
export const save = async (newDonation) => {
    const donation = new Donation(newDonation);
    console.log(newDonation);
    donation.populate('createdUser');
    return await donation.save();
}

//get a donation by id
export const getById = async (id) => {
    //to populate other user details in user object
    const donation = await Donation.findById(id).populate('createdUser');
    return donation;
}

//update a donation
export const update = async (updatedDonations, id) => {
    const updated = await Donation.findByIdAndUpdate(id, updatedDonations, { new: true }).exec();
    return updated;
}

//remove a donation
export const remove = async (id) => {
    return await Donation.findByIdAndDelete(id).exec();
}