import mongoose from 'mongoose';

// Getting the schema from mongoose
const Schema = mongoose.Schema;

// Creating UserSchema
const UserSchema = new Schema({
    person: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        // To show whether user is online
        isActive: {
            type: Boolean
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        // To disable the versioning
        versionKey: false
    });

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;