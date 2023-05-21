const express = require('express');
const router = express.Router();

// Define the dashboard route
router.get('/', (req, res) => {
  // Render the dashboard view
  res.render('dashboard');
});

module.exports = router;
