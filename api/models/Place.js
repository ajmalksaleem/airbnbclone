const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Usercol' },
    title: String,
    address: String,
    addedPhotos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
})

const PlaceModel = mongoose.model('Placescol', placeSchema)

module.exports = PlaceModel;