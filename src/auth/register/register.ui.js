export function setupRegisterUI() {
  const registerContainer =
    document.getElementById("register") || document.body;
  registerContainer.className = "container";
  registerContainer.innerHTML = `
    <h1><i class="fas fa-user-plus"></i> Register</h1>
    <form id="register-form">
      <label for="reg-username">Username:</label>
      <input type="text" id="reg-username" placeholder="Choose a username" required minlength="3">
      
      <label for="reg-email">Email:</label>
      <input type="email" id="reg-email" placeholder="Enter your email" required>
      
      <label for="reg-password">Password:</label>
      <input type="password" id="reg-password" placeholder="Choose a password" required>
      
      <div id="password-strength">
        <div class="requirement" id="req-length">✓ At least 8 characters</div>
        <div class="requirement" id="req-uppercase">✓ Uppercase letter</div>
        <div class="requirement" id="req-number">✓ Number</div>
        <div class="requirement" id="req-special">✓ Special character (!@#$%^&*)</div>
      </div>
      
      <button type="submit" id="register-button" disabled>Register</button>
    </form>
    <p>Already have an account? <a class="loginLink" href="login.html">Login ➡</a></p>
  `;
}

export function createThemeToggle() {
  const container = document.createElement("div");
  container.className = "theme-switch";
  container.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle" title="Toggle dark mode">
      ${localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  return container;
}
