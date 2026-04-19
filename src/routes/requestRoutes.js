const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getNearbyResources } = require('../controllers/request.controller');

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id/nearby-resources', getNearbyResources);

module.exports = router;
