
const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('../models/User');

// rendering the login form
router.get('/', (req, res) => {
  res.render('login');
});

// Handling for submission
router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username)
    .then((user) => {
      if (user) {
        // user found, compare passwords
        if (User.comparePasswords(password, user.password)) {
          // Passwords match

          //session
          req.session.loggedIn = true;
          req.session.username = username;


          res.redirect('/dashboard');
        } else {
          // if passwords do not match
          res.render('login', { error: 'Invalid username or password' });
        }
      } else {
        // rende if user not found
        res.render('login', { error: 'Invalid username or password' });
      }
    })
    .catch((error) => {
      // Handling errors
      console.log(error);
      res.render('login', { error: 'An error occurred' });
    });
});

module.exports = router;
