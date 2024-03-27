const API_ROOT = "http://localhost:3000/api/v1";

async function rest(url: string, body?: unknown, method?: string, headers?: any) {
    return await fetch(url, {
        method: method ?? (body ? "POST" : "GET"),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    })
        .then(response => response.ok
            ? response.json()
            : response.json().then(err => Promise.reject(err))
        )

}

export async function api(action: string, body?: unknown, method?: string, headers?: any) {
    return await rest(`${API_ROOT}/${action}`, body, method, headers);
}