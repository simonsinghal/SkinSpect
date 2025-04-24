const mongoose = require('mongoose');

const contactQuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  response: { type: String, default: '' },
});

const ContactQuery = mongoose.model('ContactQuery', contactQuerySchema);

module.exports = ContactQuery;