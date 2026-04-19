const requestService = require('../services/request.service');
const resourceService = require('../services/resource.service');
const matchService = require('../services/match.service');

// @desc    Create a new request
// @route   POST /requests
// @access  Public
exports.createRequest = async (req, res, next) => {
  try {
    const request = await requestService.createRequest(req.body);
    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all requests
// @route   GET /requests
// @access  Public
exports.getRequests = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }

    const requests = await requestService.getAllRequests(filter);
    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Find nearby resources for a request
// @route   GET /requests/:id/nearby-resources
// @access  Public
exports.getNearbyResources = async (req, res, next) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    const maxDistance = req.query.distance || 10000;
    const resources = await resourceService.findNearbyResources(request.location, request.type, maxDistance);

    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    next(error);
  }
};
