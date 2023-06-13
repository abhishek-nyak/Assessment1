// routes/resetPassword.js
const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

// Render the password reset form
// Handle GET request for password reset form
router.get('/', (req, res) => {
    res.render('resetPasswordForm');
  });

// Handle password reset submission
router.post('/', resetPasswordController);

module.exports = router;