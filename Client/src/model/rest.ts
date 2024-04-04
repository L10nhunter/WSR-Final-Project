import {showError} from "@/model/session";

const API_ROOT: string = "http://localhost:3000/api/v1";

async function rest(url: string, body?: unknown, method?: string, headers?: any) {
    console.log("rest.ts rest url: " + url)
    console.log("rest.ts rest body: " + JSON.stringify(body))
    console.log("rest.ts rest method: " + method)
    console.log("rest.ts rest headers: " + headers)
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
            : response.json().then(err => {
                    showError(err,"Error " + response.status + " (" + response.statusText + "): " + err.message)
                    Promise.reject(err)
                }
            )
        );
}

export async function api(endpointURL: string, body?: unknown, method?: string, headers?: any) {
    return await rest(`${API_ROOT}/${endpointURL}`, body, method, headers);
}