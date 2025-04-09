export function checkAuthAndRedirect() {
  const token = localStorage.getItem("token");
  if (token) {
    const redirectUrl = sessionStorage.getItem("redirectUrl") || "index.html";
    window.location.href = redirectUrl;
  }
}

export function storeUserData(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role || "user");
}

export function redirectAfterLogin() {
  const redirectUrl = sessionStorage.getItem("redirectUrl") || "index.html";
  sessionStorage.removeItem("redirectUrl");
  window.location.href = redirectUrl;
}
