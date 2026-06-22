const API_URL = 'https://authentication.sarasjodin.se/api';

const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const usernameInput = document.querySelector('#username').value.trim();
  const passwordInput = loginForm.querySelector('#password').value;

  loginMessage.textContent = 'Logging in...';

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
      loginMessage.textContent = data.message || 'Login failed';
      return;
    }

    localStorage.setItem('token', data.token);
    loginForm.reset();
    window.location.href = 'profile.html'; // redirect to profile page after login
  } catch (error) {
    console.error('Login error:', error);
    loginMessage.textContent = 'Could not connect to the server';
  }
});
