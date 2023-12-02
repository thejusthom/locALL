import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FeedShareSchema = new Schema ({
    foodType: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    postedDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    createdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    locationId: {
        type: String,
        required: true
    }
});

const FeedShare = mongoose.model('feedShare', FeedShareSchema);

export default FeedShare;