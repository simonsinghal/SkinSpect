const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  status: { // To track if it's new, reviewed, or converted to FAQ
    type: String,
    enum: ['new', 'reviewed', 'converted_to_faq'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Query', querySchema);