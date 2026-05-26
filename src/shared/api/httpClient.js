const API_BASE_URL = "https://localhost:7149";

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
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

export async function httpGetBlob(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const blob = await response.blob();

    const contentDisposition = response.headers.get("content-disposition");

    let fileName = "contract.docx";

    if (contentDisposition) {
        const utf8FileNameMatch = contentDisposition.match(
            /filename\*=UTF-8''([^;]+)/
        );

        const defaultFileNameMatch = contentDisposition.match(
            /filename="?([^";]+)"?/
        );

        if (utf8FileNameMatch?.[1]) {
            fileName = decodeURIComponent(utf8FileNameMatch[1]);
        } else if (defaultFileNameMatch?.[1]) {
            fileName = defaultFileNameMatch[1];
        }
    }

    return {
        blob,
        fileName,
    };
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