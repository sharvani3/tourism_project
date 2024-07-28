const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT
const express = require('express');
const app = express();
const authRoute = require("./routes/auth.route")

app.use(bodyParser.json());



app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))


app.use('/api/auth',authRoute)

mongoose.connect(process.env.MONGODBURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('mongo connected')).catch(err=>console.log('error',err))
app.get('/',(req,res)=>{res.json('server is ready')});

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const ItinerarySchema = new mongoose.Schema({
  location: String,
  startDate: Date,
  endDate: Date,
  places: Array
});

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);

// Generate itinerary
app.post('/api/itinerary', async (req, res) => {
  const { location, startDate, endDate } = req.body;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=points+of+interest+in+${location}&key=${process.env.GOOGLE_API_KEY}`);
    const places = response.data.results.map(place => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total
    }));

    const itinerary = new Itinerary({
      location,
      startDate,
      endDate,
      places
    });

    await itinerary.save();
    res.json(itinerary);
  } catch (error) {
    res.status(500).send('Error generating itinerary');
  }
});

// Get all itineraries
app.get('/api/itineraries', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    res.status(500).send('Error fetching itineraries');
  }
});

app.listen(PORT,()=>console.log('server is running on 7800'));