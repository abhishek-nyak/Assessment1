  
// To use the script in multiple files!

if (typeof passwordInput === 'undefined') {
  passwordInput = document.getElementById('password');
}

if (typeof togglePassword === 'undefined') {
  const togglePassword = document.getElementById('togglePassword');
}

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type');
  passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  togglePassword.classList.toggle('active');
});
