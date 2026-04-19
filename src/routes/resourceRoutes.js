const express = require('express');
const router = express.Router();
const { createResource, getResources } = require('../controllers/resource.controller');

router.post('/', createResource);
router.get('/', getResources);

module.exports = router;
