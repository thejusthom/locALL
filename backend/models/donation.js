import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  donationName: {
    type: String,
    required: true
  },
  postedOn: {
    type: Date,
    required: true
  },
  descriptionInfo: {
    type: String,
    required: true
  },
  amountRequired: {
    type: Number,
    required: true
  },
  amountAchieved: {
    type: Number,
    required: false
  },
  image: {
    type: String,
    // required: true
},
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locationId: {
    type: String,
    required: true
  },
  receiver: {
    type: {name: String, age: Number, contact: String},
    required: true
  }, 
  category: {
    type: String,
    required: true
  }
},{
  versionKey: false
});

const donationModel = mongoose.model("donation", donationSchema);
export default donationModel;