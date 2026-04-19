const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getNearbyResources } = require('../controllers/requestController');

router.route('/')
  .post(createRequest)
  .get(getRequests);

router.route('/:id/nearby-resources')
  .get(getNearbyResources);

module.exports = router;
