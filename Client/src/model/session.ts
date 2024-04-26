import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {showLoginModal, type User} from "@/model/users";
import {api} from "@/model/rest";
import type {DataEnvelope} from "@/model/TransferTypes";

interface LoginReturn {
    user: User,
    token: string
}

const session = reactive({
    user: null as User | null,
    token: null as string | null,
    redirectURL: null as string | null,
    messages: [] as {
        type: string,
        message: string
    }[],
    loading: 0
});

export function getSession() {
    return session;
}

export function getUserFullName() {
    return session.user?.firstName + " " + session.user?.lastName;
}

export function useLogin() {
    const router = useRouter();
    return {
        async login(emailOrUsername: string, password: string): Promise<User> {
            return await api<LoginReturn>("users/login", {emailOrUsername, password}, "POST")
                .then((response : DataEnvelope<LoginReturn> ) => {
                    session.user = response.data.user;
                    if (!session.user) throw new Error("Invalid login credentials. Please try again.");
                    session.token = response.data.token;
                    showLoginModal.value = false;
                    router.push(session.redirectURL ?? "/").then((r) => r);
                    useToast().success("Welcome " + session.user.firstName + " " + session.user.lastName + "!\nYou are now logged in.");
                    console.debug("User " + session.user.firstName + " " + session.user.lastName + " logged in.");
                    return session.user;
                })
                .catch((err)=>{throw err}) as User;

        },
        logout(): void {
            session.user = null;
            session.token = null;
            for(let i = 0; i < session.messages.length; i++) {
                console.debug("Messages: ");
                if(session.messages[i].type === "error") {
                    console.error(session.messages[i].message);
                } else {
                    console.debug(session.messages[i].message);
                }
            }
            router.push('/').then((r) => r);
        }
    }
}