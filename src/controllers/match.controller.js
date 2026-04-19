const matchService = require('../services/match.service');

// @desc    Match a request with the nearest available resource
// @route   POST /match/:requestId
// @access  Public
exports.matchRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const result = await matchService.performMatching(requestId);

    // No resource found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No nearby resources available"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        request: result.request,
        resource: result.matchedResource,
        distance: result.distance
      }
    });

  } catch (error) {
    next(error);
  }
};