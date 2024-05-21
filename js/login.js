document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    fetch('users.json')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          alert('Login successful! click Ok to continue to homepage');
          // Redirect to the home page
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