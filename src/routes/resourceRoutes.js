const express = require('express');
const router = express.Router();
const { createResource, getResources } = require('../controllers/resourceController');

router.route('/')
  .post(createResource)
  .get(getResources);

module.exports = router;
