const API_BASE_URL = "https://localhost:7149";

export async function httpGet(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}