// Set up hb menu and logout button
export function setupMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const logoutBtn = document.querySelector('#logout-btn');

  // Toggle mobile navigation menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');

      // Update accessibility attributes and icon
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      hamburger.textContent = isOpen ? '✕' : '☰';
    });
  }

  // Log out user and return to home page
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
}
