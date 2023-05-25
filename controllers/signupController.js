
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rendering the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
