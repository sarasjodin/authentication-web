const API_URL = 'https://authentication.sarasjodin.se/api';

const registerForm = document.querySelector('#register-form');
const registerMessage = document.querySelector('#register-message');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  registerMessage.textContent = 'Creating account...';

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
      registerMessage.textContent = data.message || 'Could not create account';
      return;
    }

    registerMessage.textContent =
      data.message || 'Account created successfully!';
    registerForm.reset();
  } catch (error) {
    console.error('Register error:', error);
    registerMessage.textContent = 'Could not connect to the server';
  }
});
