const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    userId: String,
    title: String,
    university: String,
    location: String,
    description: String
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;