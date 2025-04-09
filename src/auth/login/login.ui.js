export function createLoginForm() {
  const loginContainer = document.getElementById("login") || document.body;

  loginContainer.innerHTML = `
    <h1><i class="fas fa-sign-in-alt"></i> Login</h1>
    <form id="login-form">
      <label for="loginUsername">Username:</label>
      <input type="text" id="loginUsername" placeholder="Enter your username" required>
      <br>
      <label for="loginPassword">Password:</label>
      <input type="password" id="loginPassword" placeholder="Enter your password" required>
      <br>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a id="register-link" href="register.html">Register ➡</a></p>
  `;
}

export function createThemeToggle() {
  const themeToggleContainer = document.createElement("div");
  themeToggleContainer.className = "theme-switch";
  themeToggleContainer.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle" title="Toggle dark mode">
      ${localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  document.body.insertBefore(themeToggleContainer, document.body.firstChild);
}
