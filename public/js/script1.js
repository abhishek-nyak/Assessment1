document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
  
    // Perform validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // Perform signup logic
    // Replace this with your actual signup logic, such as sending the form data to a server
    // Example AJAX request:
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Signup successful
          alert("Signup successful!");
        } else {
          // Signup failed
          alert("Signup failed. Please try again.");
        }
      }
    };
    var data = JSON.stringify({ username: username, email: email, password: password });
    xhr.send(data);
  
    // Reset form fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
  });
  