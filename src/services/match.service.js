const Request = require('../models/Request');
const Resource = require('../models/Resource');

class MatchService {
  async performMatching(requestId) {
    const request = await Request.findById(requestId);

    if (!request) {
      throw { status: 404, message: 'Request not found' };
    }

    if (request.status !== 'pending') {
      throw { status: 400, message: 'Request already processed' };
    }

    const results = await Resource.aggregate([
      {
        $geoNear: {
          near: request.location,
          distanceField: "distance",
          maxDistance: 10000,
          query: { type: request.type, available: true },
          spherical: true
        }
      },
      { $limit: 1 }
    ]);

    const resourceData = results[0];

    if (!resourceData) {
      return null;
    }

    // 🔥 LOCK RESOURCE FIRST (important)
    const resource = await Resource.findOneAndUpdate(
      { _id: resourceData._id, available: true },
      { $set: { available: false } },
      { new: true }
    );

    if (!resource) {
      // someone else took it → retry logic could be added later
      throw { status: 409, message: 'Resource already assigned' };
    }

    // update request
    request.status = 'matched';
    request.assignedResourceId = resource._id;
    await request.save();

    return {
      request,
      matchedResource: resource,
      distance: resourceData.distance
    };
  }
}

module.exports = new MatchService();
