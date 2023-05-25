const express = require('express');
const router = express.Router();

// login route
router.get('/', (req, res) => {
  // Rendering the login view
  res.render('login');
});

module.exports = router;
