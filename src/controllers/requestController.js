const Request = require('../models/Request');

// @desc    Create a new request
// @route   POST /api/requests
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
// @route   GET /api/requests
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
