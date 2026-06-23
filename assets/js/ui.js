export function showMessage(element, message, type) {
  element.textContent = message;

  element.classList.remove('info', 'success', 'error', 'warning');

  element.classList.add(type);
}
