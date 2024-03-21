import {reactive} from "vue";
import {useRouter} from "vue-router";
import type {User} from "@/model/users";
import {useToast} from "vue-toastification";
import {getUserByLoginCredentials} from "@/model/users";

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

export function getSession() {
    return session;
}

export function getUser() {
    return session.user;
}

export function getUserFullName() {
    return session.user?.firstName + " " + session.user?.lastName;
}

export function getUserName() {
    return session.user?.username;
}

// this will at some point be a call to the server to get the user
export function useLogin() {
    const router = useRouter();
    return {
        async login(emailOrUsername: string | undefined, password: string | undefined): Promise<User | null> {
            session.loading = true;
            try {
                if (!emailOrUsername || !password) {
                    toast.error("Please enter a username and password");
                    return null;
                }
                // this will be an API call to the server
                const user = getUserByLoginCredentials(emailOrUsername, password);
                if (!user) {
                    toast.error("Invalid username or password");
                    return null;
                }
                session.user = user;
                router.push(session.redirectURL ?? "/").then((r) => r);
                return user;
            }
            catch (e) {
                toast.error("Invalid username or password");
                return null;
            }
        },
        logout(): void {
            session.user = null;
            router.push('/').then((r) => r);
        }
    }
}