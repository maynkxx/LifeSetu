const Resource = require('../models/Resource');

// @desc    Create a new resource
// @route   POST /resources
// @access  Public
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all resources
// @route   GET /resources
// @access  Public
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
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
