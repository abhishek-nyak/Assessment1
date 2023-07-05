const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const changePasswordController =require('../controllers/changePasswordController');

router.get('/accountSetting', (req, res) => {

  res.render('accountSetting/change-password');
});


router.get('/accountSetting/change-password', (req, res) => {

    res.render('accountSetting/change-password');
  });
router.post('accountSetting/change-password', changePasswordController.submit)


router.get('/accountSetting/change-name', (req, res) => {

    res.render('accountSetting/change-name');
  });

router.get('/accountSetting/delete-account', (req, res) => {

    res.render('accountSetting/delete-account');
  });

router.get('/accountSetting/address', (req, res) => {

  if(req.session.loggedIn){//user is authenticated
    const username =req.session.email_id;
    let address;
    Address.get(username)
    .then((address)=>{
        fName = address.full_name;
    })
    .then( (orderData) => {
      res.render('accountSetting/address', currentAddress =false);
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
  
  

module.exports = router;
