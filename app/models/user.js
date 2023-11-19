import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
        versionKey: false
    });

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;