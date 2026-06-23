import { showMessage } from './ui.js'; // Imports function that handles ui message

// Base URL for the authentication API
const API_URL = 'https://authentication.sarasjodin.se/api';

// variables for login form and message display
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');

// Handle login form submission
loginForm.addEventListener('submit', async (event) => {
  // Prevent page reload when the form is submitted
  event.preventDefault();

  // Get values from the form
  const usernameInput = document.querySelector('#username').value.trim();
  const passwordInput = loginForm.querySelector('#password').value;

  // Show a status message while the request is being processed
  showMessage(loginMessage, 'Logging in...', 'info');

  try {
    // Send login request to the API
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput
      })
    });

    // Convert response from JSON to JavaScript object
    const data = await response.json();

    // Show error message if login failed
    if (!response.ok) {
      showMessage(loginMessage, data.message || 'Login failed', 'error');
      return;
    }

    // Save JWT token in local storage
    localStorage.setItem('token', data.token);

    // Clear the form fields
    loginForm.reset();

    // redirect to profile page with protected sections after successful login
    window.location.href = 'profile.html';
  } catch (error) {
    // Show error message if the server cannot be reached
    showMessage(loginMessage, 'Could not connect to the server', 'error');
  }
});
