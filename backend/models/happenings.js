import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HappeningSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedDate: {
        type: String,
        required: true
    },
    //to get the user object from User Schema
    createdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    }
},
    {
        versionKey: false
    });

const HappeningModel = mongoose.model('Happening', HappeningSchema);
export default HappeningModel;