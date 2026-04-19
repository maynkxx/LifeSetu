const resourceService = require('../services/resource.service');

// @desc    Create a new resource
// @route   POST /resources
// @access  Public
exports.createResource = async (req, res, next) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all resources
// @route   GET /resources
// @access  Public
exports.getResources = async (req, res, next) => {
  try {
    const { available, type } = req.query;
    const filter = {};

    if (available) {
      filter.available = available === 'true';
    }
    if (type) {
      filter.type = type;
    }

    const resources = await resourceService.getAllResources(filter);
    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    next(error);
  }
};
