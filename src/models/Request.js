const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please add a request type'],
    trim: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'matched', 'in_progress', 'completed'],
    default: 'pending'
  },
  assignedResourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    default: null
  }
}, {
  timestamps: true
});

// Add index for geospatial queries
requestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Request', requestSchema);
