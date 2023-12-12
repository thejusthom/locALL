import FeedShare from "../models/feedShare.js";

/**
 * Searches for feed shares based on the provided parameters.
 * @param {Object} params - The search parameters.
 * @returns {Promise<Array>} - A promise that resolves to an array of feed shares.
 */
export const search = async (params = {}) => {
  const feedShare = await FeedShare.find(params).populate('createdUser');
  return feedShare;
}

/**
 * Retrieves all feed shares for a given location.
 * @param {string} locationId - The ID of the location.
 * @returns {Promise<Array>} - A promise that resolves to an array of feed shares.
 */
export const getAll = async (locationId) => {
  const location = {
    locationId
  }
  return FeedShare.find(location).populate('createdUser');
}

/**
 * Saves a new feed share.
 * 
 * @param {Object} newFeedShare - The new feed share object to be saved.
 * @returns {Promise} - A promise that resolves to the saved feed share.
 */
export const save = async (newFeedShare) => {
  const feedShare = new FeedShare(newFeedShare);
  console.log(feedShare);
  return feedShare.save();
}

/**
 * Finds a feed share by its ID.
 *
 * @param {string} id - The ID of the feed share to find.
 * @returns {Promise<Object>} - A promise that resolves to the found feed share object.
 */
export const find = async (id) => {
  const feedShare = await FeedShare.findById(id).populate('createdUser');
  return feedShare;
}   

/**
 * Updates a feed share by its ID.
 * @param {Object} updatedFeedShare - The updated feed share object.
 * @param {string} id - The ID of the feed share to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated feed share.
 */
export const update = async (updatedFeedShare, id) => {
    const feedShare = await FeedShare.findByIdAndUpdate(id, updatedFeedShare).exec();
    return feedShare;
}

/**
 * Removes a feed share by its ID.
 * @param {string} id - The ID of the feed share to be removed.
 * @returns {Promise<object|null>} - A promise that resolves to the deleted feed share object, or null if not found.
 */
export const remove = async (id) => {
    return await FeedShare.findByIdAndDelete(id).exec()
}

/**
 * Retrieves feed shares based on the provided parameters.
 * @param {Object} params - The parameters to filter the feed shares.
 * @returns {Promise<Array>} - A promise that resolves to an array of feed shares.
 */
export const getByParams = async (params = {}) => {
    console.log(params);
    const feedShare = await FeedShare.find(params).populate('createdUser');
    return feedShare;
}