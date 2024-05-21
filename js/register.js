document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        // Check if the username already exists
        const response = await fetch('http://localhost:3000/');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();

        console.log(users)

        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different username.');
        } else {
            // Add the new user to the server
            const newUser = { username, email, password };
            const addUserResponse = await fetch('http://localhost:3000/', {
                method: 'POST',
                body: JSON.stringify(newUser)
            });

            if (!addUserResponse.ok) {
                throw new Error(`HTTP error! Status: ${addUserResponse.status}`);
            }

            console.log('New user registered:', newUser);
  
            // Redirect to login page
            alert('Registration successful! Redirecting to login page.');
            window.location.href = 'login.html';
        }
        } catch (error) {
            console.log('Error registering user:', error);
            alert('An error occurred while registering. Please try again later.');
        }
});
