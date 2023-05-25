const express = require('express');
const router = express.Router();
const User = require('../models/User');

// login route
router.get('/', (req, res) => {
  // login view
  res.render('signup');
});

router.post('/', (req, res) => {
  const { username, password, confirmPassword, email, phoneNumber } = req.body;

  // Checking if password and confirm password match
  if (password !== confirmPassword) {
    res.render('signup', { error: 'Password and Confirm Password do not match' });
    return;
  }

  User.findByUsername(username)
    .then((user) => {
      if (user) {
        // User already exists
        res.render('signup', { error: 'Username is already taken' });
      } else {
        // creating a new user
        User.create(username, password, email, phoneNumber)
          .then(() => {
            // User created successfully, redirect to login page or home page
            //render
            res.redirect('/login', { error: 'Account created sucessfully' });
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
