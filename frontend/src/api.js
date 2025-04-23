const API_URL = "http://localhost:3000";

export async function registerUser(role, data) {
    return fetch(`${API_URL}/${role}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function loginUser(role, data) {
    const res = await fetch(`${API_URL}/${role}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) localStorage.setItem("token", result.token);
    return result;
}

export async function getNotices() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/notices`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}
