// Importing mongoose library
import mongoose from 'mongoose';

// Creating a schema object
const Schema = mongoose.Schema;

// Defining the Happening schema
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
    // Reference to the User schema to get the user object
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

// Creating a model using the Happening schema
const HappeningModel = mongoose.model('Happening', HappeningSchema);

// Exporting the Happening model
export default HappeningModel;