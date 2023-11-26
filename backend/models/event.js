import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  descriptionInfo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  catergory: {
    type: String,
    required: true
  },
  //To get user from user schema using the id of that user
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locationId: {
    type: String,
    required: true
  }
},{
  versionKey: false
});

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;