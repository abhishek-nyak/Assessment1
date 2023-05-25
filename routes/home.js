const express = require('express');
const router = express.Router();


// home route
router.get('/', (req, res) => {
  // Render the home view
  res.render('home',{

  });
});

module.exports = router;
