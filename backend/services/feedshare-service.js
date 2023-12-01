import FeedShare from "../models/feedShare.js";

export const search = async (params = {}) => {
  const feedShare = await FeedShare.find(params).exec();
  return feedShare;
}

export const getAll = async (locationId) => {
  const location = {
    locationId
  }
  return FeedShare.find(location).populate('createdUser');
}

export const save = async (newFeedShare) => {
  const feedShare = new FeedShare(newFeedShare);
  console.log(feedShare);
  return feedShare.save();
}

export const find = async (id) => {
  const feedShare = await FeedShare.findById(id).populate('createdUser');
  return feedShare;
}   

export const update = async (updatedFeedShare, id) => {
    const feedShare = await FeedShare.findByIdAndUpdate(id, updatedFeedShare).exec();
    return feedShare;
}

export const remove = async (id) => {
    return await FeedShare.findByIdAndDelete(id).exec()
}