const express = require('express');
const router = express.Router();
const { matchRequest } = require('../controllers/match.controller');

router.post('/:requestId', matchRequest);

module.exports = router;