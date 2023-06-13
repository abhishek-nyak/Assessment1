
const express = require('express');

const router = express.Router();

const Order = require('../models/Order');
const User = require('../models/User');

// Rendering the dashboard
router.get('/dashboard', (req, res) => {

    if(req.session.loggedIn){//user is authenticated
        const username =req.session.email_id;
        let fName;
        User.findName(username)
        .then((name)=>{
            fName = name.full_name;
            return Order.getOrders(username);
        })
        .then( (orderData) => {
          res.render('dashboard', { fName, orderData });
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








module.exports = router;
