import { showMessage } from './ui.js';

const API_URL = 'https://authentication.sarasjodin.se/api';

const registerForm = document.querySelector('#register-form');
const registerMessage = document.querySelector('#register-message');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  showMessage(registerMessage, 'Creating account...', 'info');

  try {
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

    const data = await response.json();

    if (!response.ok) {
      showMessage(registerMessage, data.message, 'error');
      return;
    }

    showMessage(registerMessage, data.message, 'success');
    registerForm.reset();
  } catch (error) {
    console.error('Register error:', error);
    showMessage(registerMessage, 'Could not connect to the server', 'error');
  }
});
