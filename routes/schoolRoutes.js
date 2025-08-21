const express = require('express');
const router = express.Router();
const { addSchool } = require('../controllers/schoolController');

// Add School API
router.post('/addSchool', addSchool);

module.exports = router;
