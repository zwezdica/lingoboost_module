export function checkAuthStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to play.");
    window.location.href = "login.html";
  }
}
