const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please add a resource type'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
    min: [0, 'Quantity cannot be negative']
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
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for geospatial queries
resourceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Resource', resourceSchema);
