export function initializeVirtualKeyboard(inputFieldId, keyboardContainerId) {
  const inputField = document.getElementById(inputFieldId);
  const keyboardContainer = document.getElementById(keyboardContainerId);

  if (!inputField || !keyboardContainer) return;

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";
  iconContainer.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  `;
  iconContainer.style.display = "none";
  document.body.appendChild(iconContainer);

  keyboardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("keyboard-key")) {
      inputField.value = e.target.textContent;
      const event = new Event("input", { bubbles: true });
      inputField.dispatchEvent(event);
    }
  });
}
