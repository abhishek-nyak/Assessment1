// resetPassword.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mailer = require('../utils/mailer');

// Handle GET request for password reset form
router.get('/', (req, res) => {
  res.render('resetPasswordForm');
});

// Handle POST request for password reset
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findByUsername(email);
    if (!user) {
      // Email does not exist, show error message
      return res.render('resetPasswordForm', { error: 'Email not found' });
    }

    // Generate a new password or reset link
    // const newPassword = generateNewPassword();

    // Update user's password in the database
    // cawait User.updatePassword(user.id, newPassword);

    // Send an email to the user with the password reset link
    const resetLink = generateResetLink();
    await mailer.sendResetEmail(email, resetLink);
    

  
    
    // Redirect the user to a confirmation page or show a success message
    res.render('passwordResetConfirmation');
  } catch (error) {
    // Handle errors appropriately
    console.error('Password reset error:', error);
    res.render('resetPasswordForm', { error: 'An error occurred' });
  }
});
//gerate token
function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }



// Function to generate a password reset link
function generateResetLink() {
    const resetToken = generateRandomToken(10); // Generate a random token of length 10


    const resetLink = `localhost:3000/reset-password?token=${resetToken}`;

    return resetLink;
}

module.exports = router;
