document.addEventListener('DOMContentLoaded', function() {
  // Ensure the login form exists before adding event listeners
  const loginForm = document.getElementById('loginForm');
  const closeButton = document.querySelector('.close-btn');

  if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const username = document.getElementById('loginUsername').value;
          const password = document.getElementById('loginPassword').value;
        
          fetch('users.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  const users = data.users;
                  if (!Array.isArray(users)) {
                      throw new Error('Invalid JSON format: expected an array of users');
                  }
                  const user = users.find(user => user.username === username && user.password === password);
                  if (user) {
                      alert('Login successful! Click OK to continue to the homepage.');
                      window.location.href = 'index.html'; 
                  } else {
                      alert('Invalid username or password');
                  }
              })
              .catch(error => {
                  console.error('Error fetching users:', error);
                  alert('An error occurred while logging in. Please try again later.');
              });
      });
  }

  if (closeButton) {
      closeButton.addEventListener('click', () => {
          console.log('X button clicked');
          window.location.href = 'index.html';
      });
  }
});
