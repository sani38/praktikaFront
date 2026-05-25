const API_BASE_URL = "https://localhost:7149";

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}

async function handleResponse(response) {
    const text = await response.text();

    if (!response.ok) {
        let message = `HTTP error: ${response.status}`;

        if (text) {
            try {
                const errorBody = JSON.parse(text);
                message = errorBody.detail || errorBody.title || message;
            } catch {
                message = text;
            }
        }

        throw new Error(message);
    }

    return text ? JSON.parse(text) : null;
}

export async function httpGet(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}

export async function httpPost(url, body = null) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : null;
}