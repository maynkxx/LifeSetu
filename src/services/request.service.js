const Request = require('../models/Request');

class RequestService {
  async createRequest(requestData) {
    return await Request.create(requestData);
  }

  async getAllRequests(filter = {}) {
    return await Request.find(filter);
  }

  async getRequestById(id) {
    return await Request.findById(id);
  }

  async updateRequest(id, updateData) {
    return await Request.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }
}

module.exports = new RequestService();
