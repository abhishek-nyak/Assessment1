const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundryController');

// Route to display the Laundry request form
router.get('/laundryRequest', laundryController.showLaundryRequestForm);

// Route to handle the form submission
router.post('/laundryRequest', laundryController.submitLaundryRequestForm);

 router.post('/successRequest',(req,res)=>{
     res.redirect('/dashboard')
})
module.exports = router;
