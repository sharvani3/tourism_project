// routes/itinerary.js
const express = require('express');
const Itinerary = require('../models/Itinerary');
const router = express.Router();

// Route to save a new itinerary
router.post('/save', async (req, res) => {
  try {
    const { title, destination, accommodation, transportation, days, tips } = req.body;

    // Validate the request body
    if (!title || !destination) {
      return res.status(400).json({ message: 'Title and destination are required' });
    }

    // Create a new itinerary
    const newItinerary = new Itinerary({
      title,
      destination,
      accommodation,
      transportation,
      days,
      tips
    });

    // Save the itinerary to the database
    await newItinerary.save();
    res.status(201).json({ message: 'Itinerary saved successfully!' });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    res.status(500).json({ message: 'Failed to save itinerary' });
  }
});

module.exports = router;
