import mongoose from "mongoose";

const Schema = mongoose.Schema;
const MarketplaceSchema = new Schema ({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    listingDate: {
        type: Date,
        required: true
    },
    description: {
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
    },
    image: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }
})

const MarketplaceModel = mongoose.model('marketplace', MarketplaceSchema);

export default MarketplaceModel;