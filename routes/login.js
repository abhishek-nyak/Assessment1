const express = require('express');
const router = express.Router();

// Define the login route
router.get('/', (req, res) => {
  // Render the login view
  res.render('login');
});

module.exports = router;
