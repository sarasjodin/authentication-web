import { showMessage } from './ui.js'; // Imports function that handles ui message

// Base URL for the authentication API
const API_URL = 'https://authentication.sarasjodin.se/api';

// Variables for profile message and data
const profileMessage = document.querySelector('#profile-message');
const profileData = document.querySelector('#profile-data');

// Get JWT token from local storage
const token = localStorage.getItem('token'); // Login saved token to localStorage

// Show message if the user is not logged in
if (!token) {
  showMessage(
    profileMessage,
    'You must log in to view this section.',
    'warning'
  );
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

    // Convert response from JSON to JavaScript object
    const data = await response.json();

    // Handle expired or invalid token
    if (!response.ok) {
      localStorage.removeItem('token');

      showMessage(profileMessage, data.message, 'error');

      profileData.innerHTML = `
        <p><a href="login.html">Log in again</a></p>
      `;

      return;
    }

    // Show success message and user information
    showMessage(profileMessage, data.message, 'success');

    profileData.innerHTML = `
      <p><strong>User ID:</strong> ${data.user.id}</p>
      <p><strong>Username:</strong> ${data.user.username}</p>
      <p><strong>Account created:</strong> ${new Date(data.user.created).toLocaleString()}</p>
    `;
  } catch (error) {
    // Show error message if the server cannot be reached
    showMessage(profileMessage, 'Could not connect to the server', 'error');
    profileData.innerHTML = '';
  }
}
