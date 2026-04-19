const Request = require('../models/Request');

// @desc    Create a new request
// @route   POST /requests
// @access  Public
exports.createRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all requests
// @route   GET /requests
// @access  Public
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Find nearby resources for a request
// @route   GET /requests/:id/nearby-resources
// @access  Public
exports.getNearbyResources = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    const { lng, lat } = { lng: request.location.coordinates[0], lat: request.location.coordinates[1] };
    const maxDistance = req.query.distance || 10000; // default 10km

    const Resource = require('../models/Resource');
    const resources = await Resource.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: maxDistance
        }
      },
      type: request.type,
      available: true
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
