const API_URL = "https://lingoboost-backend.onrender.com/api/auth";

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
