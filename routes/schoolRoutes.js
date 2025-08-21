const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');


// Add School API
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
// Export the router
module.exports = router;
