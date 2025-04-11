const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String } 
});

const Disease = mongoose.model('Disease', diseaseSchema, 'diseases'); 

module.exports = Disease;

