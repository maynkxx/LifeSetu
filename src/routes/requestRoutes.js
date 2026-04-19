const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/requestController');

router.route('/')
  .post(createRequest)
  .get(getRequests);

module.exports = router;
