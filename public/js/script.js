  
// To use the script in multiple files!

if (typeof passwordInput === 'undefined') {
  passwordInput = document.getElementById('password');
}
let togglePassword;

if (typeof togglePassword === 'undefined') {
 togglePassword = document.getElementById('togglePassword');
}

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type');
  passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  togglePassword.classList.toggle('active');
});

function validatePasswordMatch() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return false; 
  }
  return true;
}

