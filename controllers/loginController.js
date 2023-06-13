
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
      User.comparePasswords(password, user.password)
        .then((passwordsMatch) => {
          if (passwordsMatch) {
            // Passwords match
            console.log('this happen?', password);
            //session
            req.session.loggedIn = true;
            req.session.email_id = username;

            res.redirect('/dashboard');
          } else {
            // if passwords do not match
            res.render('login', { error: 'Invalid username or password' });
          }
        })
        .catch((error) => {
          // handle bcrypt.compare error
          console.error('Error comparing passwords:', error);
          res.render('login', { error: 'An error occurred' });
        });
    } else {
      // render if user not found
      res.render('login', { error: 'Invalid username or password' });
    }
  })
  .catch((error) => {
    // handle User.findByUsername error
    console.error('Error finding user:', error);
    res.render('login', { error: 'An error occurred' });
  });
});

module.exports = router;
