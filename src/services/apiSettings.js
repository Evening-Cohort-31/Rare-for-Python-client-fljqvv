export const API_BASE_URL = "http://localhost:8088";

export const fetchJson = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options
    });
    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const postJson = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`POST failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const putJson = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`PUT failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const deleteJson = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`DELETE failed: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204 ) {
        return null;
    }

    return response.json();
};