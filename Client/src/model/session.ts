import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {showLoginModal, type User} from "@/model/users";
import {api} from "@/model/rest";
import type {ObjectId} from "mongodb";

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
            return await api<User>("users/login", {emailOrUsername, password}, "POST")
                .then((response ) => {
                    const user : User = response.data;
                    if (!user) throw new Error("Invalid login credentials. Please try again.");
                    session.user = user;
                    showLoginModal.value = false;
                    router.push(session.redirectURL ?? "/").then((r) => r);
                    useToast().success("Welcome " + user.firstName + " " + user.lastName + "!\nYou are now logged in.");
                    console.debug("User " + user.firstName + " " + user.lastName + " logged in.");
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