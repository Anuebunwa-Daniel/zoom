const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  link:{type: String},
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // expires in 7 days
});
dataB = module.exports = mongoose.model('dataB', inviteSchema);
