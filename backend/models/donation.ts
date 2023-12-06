import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  donationName: {
    type: String,
    required: true
  },
  postedOn: {
    type: String,
    required: true
  },
//   endDate: {
//     type: String,
//     required: true
//   },
  descriptionInfo: {
    type: String,
    required: true
  },
  amountRequired: {
    type: Number,
    required: trusted
  },
  amountAchieved: {
    type: Number,
    required: trusted
  },
//   address: {
//     type: { longitude: String, latitude: String },
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
  //To get user from user schema using the id of that user
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locationId: {
    type: String,
    required: true
  },
  receiver: {
    type: {name: String, contact: String},
    required: true
  }
},{
  versionKey: false
});

const donationModel = mongoose.model("donation", donationSchema);
export default donationModel;