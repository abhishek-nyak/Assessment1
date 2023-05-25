
const express = require('express');

const router = express.Router();

const Order = require('../models/Order');
const User = require('../models/User');

// Rendering the dashboard
router.get('/dashboard', (req, res) => {

    if(req.session.loggedIn){//user is authenticated
        const username =req.session.username;
        Order.getOrders(username)
        .then((orderData) => {
          res.render('dashboard', { username, orderData });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send('An error occurred');
        });
        
    }
    else{
        res.render('login', { error: 'You must loggin first!' });
    }
  
});



router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      const username = req.session.username;
      const userId = req.session.userId; //  userId stored in the session
      Order.getNumberOfOrders(username)
        .then((numOrders) => {
          res.render('dashboard', { username, numOrders });
        })
        .catch((error) => {
          res.status(500).send('An error occurred');
        });
    } else {
      res.redirect('/login');
    }
  });


router.post('/create-order', (req, res) => {
    if (req.session.loggedIn) {
      const userId = req.session.userId; // UserId stored in the session
      const orderData = {
        column1: req.body.column1,
        column2: req.body.column2,
        // ...
      };
  
      Order.create(userId, orderData)
        .then((orderId) => {
          // Order created successfully, notification
          res.redirect('/dashboard');
        })
        .catch((error) => {
          // Handling errors
          res.render('dashboard', { error: 'An error occurred' });
        });
    } else {
      res.render('/login', { error: 'You must loggin first!' });
    }
  });







module.exports = router;
