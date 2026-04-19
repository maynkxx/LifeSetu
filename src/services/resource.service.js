const Resource = require('../models/Resource');

class ResourceService {
  async createResource(resourceData) {
    return await Resource.create(resourceData);
  }

  async getAllResources(filter = {}) {
    return await Resource.find(filter);
  }

  async getResourceById(id) {
    return await Resource.findById(id);
  }

  async updateResource(id, updateData) {
    return await Resource.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async findNearbyResources(location, type, maxDistance = 10000) {
    return await Resource.find({
      location: {
        $near: {
          $geometry: location,
          $maxDistance: maxDistance
        }
      },
      type: type,
      available: true
    });
  }
}

module.exports = new ResourceService();
