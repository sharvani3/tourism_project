// models/Itinerary.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  accommodation: [String],
  transportation: [String],
  days: [
    {
      title: String,
      activities: [String]
    }
  ],
  tips: [String]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
