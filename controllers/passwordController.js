//To control the resetlink form.

const User = require('../models/User');
const validate =require('../utils/validate');

  exports.renderResetPasswordForm = (req, res) => {
    const token = req.query['token'];
    // console.log("rendering Token: ", token)
  
    // Perform token validation logic here
    User.validateToken(token)
  .then((isValidToken) => {
    if (isValidToken) {
      res.render('reset-password',{ token });
    } else {
      res.send('Invalid token');
    }
  })
  .catch((error) => {
    console.error('Error validating token:', error);
    res.status(500).send('Internal Server Error'); // Handle the error appropriately
  });
  };
  
  exports.resetPassword = (req, res) => {
    const token = req.body.token;
    console.log("token:", token);
    const { password, confirmPassword } = req.body;
  
    User.validateToken(token)
      .then((isValidToken) => {
        console.log('isValidToken:', isValidToken);
        if (isValidToken) {
          console.log('here2');
          if(!validate.validatePassword(password)){
            res.render('reset-password',{token, error: 'Enter a valid Password!'});
            return;
          }
          // Handle password reset logic here
          if (password === confirmPassword) {
            // Passwords match, update user's password in the database
            User.updatePasswordByToken(token, password)
              .then(() => {
                res.render('login', { success: 'Password reset successful!' });
              })
              .catch((error) => {
                console.error('Error updating password:', error);
                res.status(500).send('Internal Server Error'); // Handle the error appropriately
              });
          } else {
            console.log('here1');
            res.render('reset-password',{token, error: "Password didn't mach!"});
          }
        } else {
          res.send('Invalid token');
          console.log(token)
        }
      })
      .catch((error) => {
        console.error('Error validating token:', error);
        res.status(500).send('Internal Server Error'); // Handle the error appropriately
      });
  };
  
  

  