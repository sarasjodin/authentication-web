import { showMessage } from './ui.js';

const API_URL = 'https://authentication.sarasjodin.se/api';

const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector('#username').value.trim();
  const passwordInput = loginForm.querySelector('#password').value;

  showMessage(loginMessage, 'Logging in...', 'info');

  try {
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

    const data = await response.json();

    if (!response.ok) {
      showMessage(loginMessage, data.message || 'Login failed', 'error');
      return;
    }

    localStorage.setItem('token', data.token);
    loginForm.reset();
    window.location.href = 'profile.html'; // redirect to profile page after login
  } catch (error) {
    showMessage(loginMessage, 'Could not connect to the server', 'error');
  }
});
