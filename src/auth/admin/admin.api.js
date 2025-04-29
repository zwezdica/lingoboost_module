const API_URL = "/api/admin";
const ITEMS_PER_PAGE = 6;

export async function fetchUsers(page = 1, token) {
  try {
    const response = await fetch(
      `${API_URL}/users?page=${page}&limit=${ITEMS_PER_PAGE}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function updateUser(userId, userData, token) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(userId, token) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function fetchLoginLogs(page = 1, token) {
  try {
    const response = await fetch(
      `${API_URL}/loginLogs?page=${page}&limit=${ITEMS_PER_PAGE}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
}

export async function deleteLog(logId, token) {
  try {
    const response = await fetch(`${API_URL}/loginLogs/${logId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to delete log");
    return await response.json();
  } catch (error) {
    console.error("Error deleting log:", error);
    throw error;
  }
}
