// Display a status message with styling
export function showMessage(element, message, type) {
  element.textContent = message;
  // Remove previous message styles
  element.classList.remove('info', 'success', 'error', 'warning');
  // Apply new message style
  element.classList.add(type);
}
