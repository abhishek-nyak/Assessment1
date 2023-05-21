const express = require('express');
const router = express.Router();

// Define the home route
router.get('/', (req, res) => {
  // Render the home view
  res.render('home.ejs');
});

module.exports = router;
