const nodemailer = require('nodemailer');

const User = require('../models/User')

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'hadley.quitzon@ethereal.email',
      pass: 'sgJP5wZCgStXt8gE4m'
  }
})

// Function to send the password reset email
function sendResetEmail(email, resetLink) {
  const mailOptions = {
    from: 'japttest@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Please click the following link to reset your password: ${resetLink}`
  };
  
  const resetToken = resetLink.split('=')[1]; //extracting token form resetlink.
  //updating from models/user.js to update it in the database reset_token. 
  User.updateResetToken(email, resetToken);


  //This will delete the token for security reason 
  setTimeout(() => {
    User.clearResetToken(email);
    // Your code to be executed after the delay
    console.log('Delayed code executed after 5 minutes');
  }, 50*60*1000);//5min delayed 




  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending password reset email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });

}

module.exports ={
  sendResetEmail
};
// // Usage
// const userEmailAddress = 'user@example.com';
// const resetLink = 'http://your-app.com/reset-password?token=abcd1234';

// sendPasswordResetEmail(userEmailAddress, resetLink);
