const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validate =require('../utils/validate');

// login route
router.get('/', (req, res) => {
  // login view
  res.render('signup');
});



router.post('/', (req, res) => {
  const { name, password, confirmPassword, email, phoneNumber } = req.body;

  // Checking if password and confirm password match
  if(!validate.validatePassword(password)){
    res.render('signup',{error: 'Enter a valid Password!'});
    return;
  }
  if (password !== confirmPassword) {
    res.render('signup', { error: 'Password and Confirm Password do not match' });
    return;
  }

  User.findByUsername(email)
    .then((user) => {
      if (user) {
        // User already exists
        res.render('signup', { error: 'User/Email is already exist' });
      } else {
        // creating a new user
        User.create(name, password, email, phoneNumber)
          .then(() => {
            // User created successfully, redirect to login page or home page
            res.render('login', { success: 'Account created successfully' });
          })
          .catch((error) => {
            // for handling database or other errors
            console.error('Error creating user:', error);
            res.render('signup', { error: 'An error occurred' });
          });
      }
    })
    .catch((error) => {
      //handling database or other errors
      console.error('Error finding user:', error);
      res.status(500).send('An error occurred');
    });
});

module.exports = router;
