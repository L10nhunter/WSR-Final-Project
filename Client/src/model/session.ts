import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {getUserByLoginCredentials, showLoginModal, type User} from "@/model/users";

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
            try {
                if (!emailOrUsername || !password) {
                    showError("Please enter a username and password");
                    return null;
                }
                // this will be an API call to the server
                const user = getUserByLoginCredentials(emailOrUsername, password);
                if (!user) {
                    showError("Invalid username or password");
                    return null;
                }
                session.user = user;
                showLoginModal.value = false;
                router.push(session.redirectURL ?? "/").then((r) => r);
                return session.user;
            }
            catch (e) {
                showError("Invalid username or password");
                return null;
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

function showError(message: string) {
    console.error(message);
    session.messages.push({type: "error", message: message});
    toast.error(message);
}