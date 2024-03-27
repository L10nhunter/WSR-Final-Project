import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {showLoginModal, type User} from "@/model/users";
import * as rest from "./rest";

const toast = useToast();

const session = reactive({
    user: null as User | null,
    token: null as string | null,
    redirectURL: null as string | null,
    messages: [] as {
        type: string,
        message: string
    }[],
    loading: false
});

export function api(action: string, body?: unknown, method?: string, headers?: any) {
    console.log("session.ts api action: " + action);
    console.log("session.ts api body: " + JSON.stringify(body));
    console.log("session.ts api method: " + method);
    console.log("session.ts api headers: " + headers);
    session.loading = true;
    if (session.token) {
        headers = headers ?? {};
        headers.Authorization = `Bearer ${session.token}`;
    }
    return rest.api(`${action}`, body, method, headers)
        .catch(err => showError(err))
        .finally(() => session.loading = false);

}


export function getSession() {
    return session;
}

export function getUser() {
    return session.user;
}

export function getUserFullName() {
    return session.user?.firstName + " " + session.user?.lastName;
}

// this will at some point be a call to the server to get the user
export function useLogin() {
    const router = useRouter();
    return {
        async login(emailOrUsername: string, password: string): Promise<User | undefined> {
            console.log(emailOrUsername, password)
            try {
                if (!emailOrUsername || !password) {
                    showError("Please enter a username and password");
                    return;
                }
                await api("users/login", {emailOrUsername, password}, "POST")
                    .then((user: User) => {
                        session.user = user;
                        showLoginModal.value = false;
                        router.push(session.redirectURL ?? "/").then((r) => r);
                        //toast.success("Welcome " + user.firstName + " " + user.lastName);
                        return session.user;
                    }).catch((e) => {
                        showError("Invalid username or password", e);
                        return null;
                    });
            }
            catch (e) {
                showError("Invalid username or password");
                return;
            }
        },
        logout(): void {
            session.user = null;
            session.token = null;
            session.messages = [];
            router.push('/').then((r) => r);
        }
    }
}

function showError(message: string, error?: any) {
    console.error(message + "\n" + error);
    session.messages.push({type: "error", message: message});
    toast.error(message);
}