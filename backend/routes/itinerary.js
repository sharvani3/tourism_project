// routes/itinerary.js
const express = require('express');
const Itinerary = require('../models/Itinerary');
const router = express.Router();

const { protect } = require('../middleware/auth'); // Import the protect middleware

// POST route to save a new itinerary for the authenticated user
router.post('/usersave', protect, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, accommodation, transportation, days, tips } = req.body;
    console.log(req.body);
    const userId = req.user; // Assumes protect sets req.user with the user ID

    // Validate required fields
    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Title, destination, start date, and end date are required' });
    }

    // Create a new itinerary associated with the user
    const newItinerary = new Itinerary({
      user: userId,
      title,
      destination,
      startDate,
      endDate,
      accommodation,
      transportation,
      days,
      tips,
    });

    // Save itinerary to the database
    const savedItinerary = await newItinerary.save();
    res.status(201).json({ message: 'Itinerary saved successfully!', itinerary: savedItinerary });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    res.status(500).json({ message: 'Failed to save itinerary' });
  }
});

// GET route to retrieve all itineraries specific to the authenticated user
router.get('/userget', protect, async (req, res) => {
  try {
    const userId = req.user; // Assumes protect sets req.user with the user ID

    // Fetch itineraries for the authenticated user
    const itineraries = await Itinerary.find({ user: userId });
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Failed to fetch itineraries' });
  }
});

router.post('/save', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, accommodation, transportation, days, tips } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Title, destination, start date, and end date are required' });
    }

    const newItinerary = new Itinerary({
      title,
      destination,
      startDate,
      endDate,
      accommodation,
      transportation,
      days,
      tips
    });
    
    const savedItinerary = await newItinerary.save();
    res.status(201).json({ message: 'Itinerary saved successfully!', itinerary: savedItinerary });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    res.status(500).json({ message: 'Failed to save itinerary' });
  }
});

router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Failed to fetch itineraries' });
  }
});

module.exports = router;