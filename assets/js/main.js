import { setupMenu } from './menu.js'; // Imports function that handles the hb menu and logout button

const body = document.querySelector('body');
const yearElement = document.querySelector('#current-year');

async function checkAuth() {
  const token = localStorage.getItem('token'); // Checks local storage for token, if not found, user is logged out

  if (!token) {
    setLoggedOut();
    return;
  }

  setLoggedIn();
}

/*
Update pages states  */
function setLoggedIn() {
  body.classList.add('is-logged-in');
  body.classList.remove('is-logged-out');
}

function setLoggedOut() {
  body.classList.add('is-logged-out');
  body.classList.remove('is-logged-in');
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

setupMenu();
checkAuth();
