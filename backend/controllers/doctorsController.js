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
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationQuery)}&key=${googleApiKey}`;
      const geocodeResponse = await axios.get(geocodeUrl);
  
      if (geocodeResponse.data.results.length === 0) {
        return res.status(404).json({ error: 'Could not geocode the provided location.' });
      }
  
      const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
  
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${range * 1000}&type=doctor&keyword=dermatologist&key=${googleApiKey}`;
      const placesResponse = await axios.get(placesUrl);
  
      if (placesResponse.data.status === 'OK') {
        // Step 1: Get base list of place IDs
        const placeResults = placesResponse.data.results.slice(0, 10); // Limit to first 10 for performance
        const doctors = [];
  
        for (const place of placeResults) {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,formatted_address,rating,user_ratings_total,opening_hours,geometry&key=${googleApiKey}`;
  
          const detailsResponse = await axios.get(detailsUrl);
  
          const details = detailsResponse.data.result;
  
          doctors.push({
            id: place.place_id,
            name: details.name || "N/A",
            phone: details.formatted_phone_number || "Not available",
            timings: details.opening_hours?.weekday_text?.join(", ") || "Not available",
            ratings: details.rating || "N/A",
            location: details.formatted_address || "N/A",
            lat: details.geometry?.location?.lat,
            lng: details.geometry?.location?.lng,
          });
        }
  
        return res.json({ doctors });
      } else {
        return res.status(500).json({
          error: 'Failed to fetch nearby dermatologists from Google Places API.',
          status: placesResponse.data.status,
          message: placesResponse.data.error_message,
        });
      }
  
    } catch (error) {
      console.error('💥 Exception:', error.response?.data || error.message);
      return res.status(500).json({
        error: 'An error occurred while fetching data.',
        details: error.message,
      });
    }
  };
  