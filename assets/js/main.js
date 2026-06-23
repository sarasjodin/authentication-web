import { setupMenu } from './menu.js'; // Imports function that handles the hb menu and logout button

// Variables for body and year element
const body = document.querySelector('body');
const yearElement = document.querySelector('#current-year');

// Check if a JWT token exists in local storage
async function checkAuth() {
  const token = localStorage.getItem('token');

  // No token found user logged out
  if (!token) {
    setLoggedOut();
    return;
  }

  // Token found user logged in
  setLoggedIn();
}

/*
Update page state -authentication status  */
function setLoggedIn() {
  body.classList.add('is-logged-in');
  body.classList.remove('is-logged-out');
}

function setLoggedOut() {
  body.classList.add('is-logged-out');
  body.classList.remove('is-logged-in');
}

// Show current year in the footer
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Initialize menu functionality
setupMenu();

// Check authentication status on page load - ui updates (logged in / logged out)
checkAuth();
