import { showMessage } from './ui.js'; // Imports function that handles ui message

// Base URL for the authentication API
const API_URL = 'https://authentication.sarasjodin.se/api';

// Variables for register form and message
const registerForm = document.querySelector('#register-form');
const registerMessage = document.querySelector('#register-message');

// Handle account creation form submission
registerForm.addEventListener('submit', async (event) => {
  // Prevent page reload when the form is submitted
  event.preventDefault();

  // Get values from the form
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  // Show status message during request processing
  showMessage(registerMessage, 'Creating account...', 'info');

  try {
    // Send registration request to the API
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });

    // Convert response from JSON to JavaScript object
    const data = await response.json();

    // Show error message if failed registration
    if (!response.ok) {
      showMessage(registerMessage, data.message, 'error');
      return;
    }

    // Show success message -clear the form
    showMessage(registerMessage, data.message, 'success');
    registerForm.reset();
  } catch (error) {
    // Show error message if the server cannot be reached
    showMessage(registerMessage, 'Could not connect to the server', 'error');
  }
});
