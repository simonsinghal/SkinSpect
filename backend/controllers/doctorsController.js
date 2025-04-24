const axios = require('axios');
require('dotenv').config();

const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Controller function to fetch nearby dermatologists using Google Places API
exports.getNearbyDermatologists = async (req, res) => {
    const { range, pinCode, city, state, country } = req.body;
    let locationQuery = '';

    if (pinCode) {
        locationQuery = pinCode;
    } else if (city && state && country) {
        locationQuery = `${city}, ${state}, ${country}`;
    } else if (city && country) {
        locationQuery = `${city}, ${country}`;
    } else {
        return res.status(400).json({ error: 'Please provide a valid location (Pin Code or City, State, Country).' });
    }

    try {
        // 1. Geocode the user's location to get latitude and longitude
        const geocodeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationQuery)}&key=${googleApiKey}`
        );

        if (geocodeResponse.data.results.length === 0) {
            return res.status(404).json({ error: 'Could not geocode the provided location.' });
        }

        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

        // 2. Use the Places API to search for dermatologists nearby
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${range * 1000}&type=doctor&keyword=dermatologist&key=${googleApiKey}`
        );

        if (placesResponse.data.status === 'OK') {
            const doctors = placesResponse.data.results.map(place => ({
                id: place.place_id,
                name: place.name,
                vicinity: place.vicinity, // Address
                geometry: place.geometry,
                rating: place.rating,
                user_ratings_total: place.user_ratings_total,
            }));
            res.json(doctors);
        } else {
            console.error('Google Places API Error:', placesResponse.data.status, placesResponse.data.error_message);
            res.status(500).json({ error: 'Failed to fetch nearby dermatologists from Google Places API.' });
        }

    } catch (error) {
        console.error('Error fetching data from Google APIs:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};
