// validate.js

function validatePassword(password) {
    // Password length must be 8 characters
    if (password.length < 8) {
      return false;
    }
  
    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Password must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Password must contain at least one digit
    if (!/[0-9]/.test(password)) {
      return false;
    }
  
    // Password must contain at least one special character
if (!/[.,_-`~'"+=<>|!@#$%^&*/\|]/.test(password)) {
      return false;
    }
  
    // Password meets all the criteria
    return true;
  }
  
  function validatePin(pin) {
    // Pin must be exactly 6 digits
    if (pin.length !== 6) {
      return false;
    }
  
    // Pin must consist of digits only
    if (!/^\d+$/.test(pin)) {
      return false;
    }
  
    // Pin is valid
    return true;
  }

  function validatePhoneNumber(phoneNumber) {
    // Phone number must consist of 10 digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      return false;
    }
  
    // Phone number is valid
    return true;
  }
  
  module.exports = {
    validatePassword,
    validatePin,
    validatePhoneNumber
  };
  