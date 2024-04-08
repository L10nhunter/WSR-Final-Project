import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {showLoginModal, type User} from "@/model/users";
import * as rest from "./rest";
import type {ObjectId} from "mongodb";

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

export async function api(action: string, body?: unknown, method?: string, headers?: any) {
    console.log("session.ts api action: " + action);
    console.log("session.ts api body: " + JSON.stringify(body));
    console.log("session.ts api method: " + method);
    console.log("session.ts api headers: " + headers);
    session.loading = true;
    return await rest.api(`${action}`, body, method, headers)
        .catch(() => {})
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

export function useRouteToEditUser(_id: ObjectId) {
    console.log("session.ts useRouteToEditUser _id: " + _id);
    const router = useRouter();
    router.push("/editUser/" + _id).then((r) => r);
}

export function useLogin() {
    const router = useRouter();
    return {
        async login(emailOrUsername: string, password: string): Promise<User> {
            return await api("users/login", {emailOrUsername, password}, "POST")
                .then((user: User) => {
                    if (!user) throw new Error("Invalid login credentials. Please try again.");
                    session.user = user;
                    showLoginModal.value = false;
                    router.push(session.redirectURL ?? "/").then((r) => r);
                    const toast= useToast();
                    toast.success("Welcome " + user.firstName + " " + user.lastName + "!\nYou are now logged in.");
                    console.log("User " + user.firstName + " " + user.lastName + " logged in.");
                    return session.user;
                })
                .catch((err)=>{throw err}) as User;

        },
        logout(): void {
            session.user = null;
            session.token = null;
            session.messages = [];
            router.push('/').then((r) => r);
        }
    }
}

interface Status {
    code: number;
    message: string;
}

export function showError(error: any, consoleOnly?: boolean, status?: Status):void {
    const toast= useToast();
    status ? console.error("Error " + status.code + " (" + status.message + ") " + error.message) : console.error(error);
    session.messages.push({type: "error", message: error.message});
    if(!consoleOnly) toast.error(error.message);
}