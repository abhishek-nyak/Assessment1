const laundryModel = require('../models/laundryModel');
const User = require('../models/User');
const Order = require('../models/Order');

// Controller action to render the Laundry request form
exports.showLaundryRequestForm = (req, res) => {
  // Check if the user is logged in (assuming you have stored the session ID in req.session.userId)
  if (!req.session.loggedIn) {
    console.log('here are you');
    return res.redirect('/login'); // Redirect to the login page if not logged in
  }

  res.render('laundryRequestForm');
};

// Controller action to handle the form submission
exports.submitLaundryRequestForm = (req, res) => {
  // Check if the user is logged in
  if (!req.session.loggedIn) {
    return res.sendStatus(401); // Unauthorized
  }

  const { pickupDate, clothesKg, clothType, remark } = req.body;
  const user = req.session.email_id;

  // Create a new laundry request in the database using the model
  laundryModel.createLaundryRequest(user, pickupDate, clothesKg, clothType, remark, (err, result) => {
    if (err) {
      // Handle any errors
      console.error(err);
      res.sendStatus(500);
    } else {
        res.render('successRequest');
    }
  });
};
