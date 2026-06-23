import { showMessage } from './ui.js';

const API_URL = 'https://authentication.sarasjodin.se/api';

const profileMessage = document.querySelector('#profile-message');
const profileData = document.querySelector('#profile-data');

const token = localStorage.getItem('token'); // Login saves token to localStorage

if (!token) {
  showMessage(profileMessage, 'You must log in to view this page.', 'info');
  profileData.innerHTML = `
    <p><a href="login.html">Go to login</a></p>
  `;
} else {
  getProfile();
}

// Fetches protected user data with JWT token and displays it on the profile page.
async function getProfile() {
  try {
    const response = await fetch(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // fetches protected data from api/protected using the JWT token

    const data = await response.json();

    if (!response.ok) {
      localStorage.removeItem('token');

      showMessage(profileMessage, data.message, 'error');

      profileData.innerHTML = `
        <p><a href="login.html">Log in again</a></p>
      `;

      return;
    }

    // Display user info
    showMessage(profileMessage, data.message, 'success');

    profileData.innerHTML = `
      <p><strong>User ID:</strong> ${data.user.id}</p>
      <p><strong>Username:</strong> ${data.user.username}</p>
      <p><strong>Account created:</strong> ${new Date(data.user.created).toLocaleString()}</p>
    `;
  } catch (error) {
    console.error('Profile error:', error);
    showMessage(profileMessage, 'Could not connect to the server', 'error'); // Else error message
    profileData.innerHTML = '';
  }
}
