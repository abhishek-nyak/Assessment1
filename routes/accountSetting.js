const express = require('express');
const router = express.Router();


router.get('/accountSetting', (req, res) => {

  res.render('accountSetting/change-password');
});


router.get('/accountSetting/change-password', (req, res) => {

    res.render('accountSetting/change-password');
  });


router.get('/accountSetting/change-name', (req, res) => {

    res.render('accountSetting/change-name');
  });

router.get('/accountSetting/delete-account', (req, res) => {

    res.render('accountSetting/delete-account');
  });
  
  
  

module.exports = router;
