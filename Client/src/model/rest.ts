import {useToast} from "vue-toastification";
import {getSession} from "@/model/session";
import {MyError} from "@/model/MyError";
import {StatusCodes} from "http-status-codes";
import type {DynamicDataEnvelope} from "@/model/TransferTypes";

const API_ROOT: string = import.meta.env.VITE_API_ROOT;

async function rest(url: string, body?: unknown, method?: string, headers?: any) {
    const session = getSession();
    session.loading++;
    headers = headers ?? {};
    if (session.token) headers.Authorization = `Bearer ${session.token}`;
    headers = {'Content-Type': 'application/json', ...headers};
    method = method ?? (body ? "POST" : "GET");
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    });
    //TODO: remove debug for production
    console.debug("rest", {
        url: url,
        body: body,
        method: method,
        headers: headers,
        response: response,
        stack: new Error().stack
    })

    const ret = response.ok ? await response.json() : response.json().then(err => {
        showError(new MyError(response.status, err.message));
        return Promise.reject(err);
    })
    session.loading--;
    return ret;
}

export async function api<T>(endpointURL: string, body?: unknown, method?: string, headers?: any): Promise<DynamicDataEnvelope<T>> {
    return await rest(`${API_ROOT}/${endpointURL}`, body, method, headers)
        .then(data => {
            if (data?.error !== undefined) throw new MyError(data.error.status, data.message, data.error.locationData);
            return data;
        })
        .catch(err => {
            showError(err instanceof MyError ? err : new MyError(500, "Unknown error"))
            return Promise.reject(err);
        }) as Promise<DynamicDataEnvelope<T>>;
}

function showError(error: MyError): void {
    const toast = useToast();
    error.locationData
        ? console.error("Error " + error.status + " (" + StatusCodes[error.status] + "):\nError Message: " + error.message + "\nthrown from " + error.locationData.fileName + " at line " + error.locationData.lineNum + ":" + error.locationData.charNum)
        : console.error("Error " + error.status + " (" + StatusCodes[error.status] + "):\nError Message: " + error.message + "\nthrown from rest.ts");
    console.error(error.stack);
    getSession().messages.push({type: "error", message: error.message});
    toast.error(error.message);
}