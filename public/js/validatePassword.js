// HTML
//<input type="password" id="passwordInput">

// JavaScript
const passwordInput = document.getElementById('password');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const isValid = validatePassword(password);

  if (isValid) {
    // Password is valid
    passwordInput.style.borderColor = 'green';
  } else {
    // Password is invalid
    passwordInput.style.borderColor = 'red';
  }
});

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

