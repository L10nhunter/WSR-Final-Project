import {ref} from "vue";
import {api} from "@/model/rest";
import type {ObjectId} from "mongodb";
import {getSession} from "@/model/session";
import {MyError} from "@/model/MyError";

interface Extras {
    maidenName?: string
    age?: number
    gender?: string
    birthDate?: string
    bloodGroup?: string
    height?: number
    weight?: number
    eyeColor?: string
    hair?: {
        color?: string
        type?: string
    }
    domain?: string
    ip?: string
    address?: {
        address?: string
        city?: string
        coordinates?: {
            lat?: number
            lng?: number
        }
        postalCode?: string
        state?: string
    }
    macAddress?: string
    university?: string
    bank?: {
        cardExpire?: string
        cardNumber?: string
        cardType?: string
        currency?: string
        iban?: string
    }
    company?: {
        address?: {
            address?: string
            city?: string
            coordinates?: {
                lat?: number
                lng?: number
            }
            postalCode?: string
            state?: string
        }
        department?: string
        name?: string
        title?: string
    }
    ein?: string
    ssn?: string
    userAgent?: string
    crypto?: {
        coin?: string
        wallet?: string
        network?: string
    }
}

export interface newUser extends Extras {
    firstName: string
    lastName: string
    email: string
    phone: string
    username: string
    password: string
    friends?: (ObjectId | string)[]
    image?: string
}

export interface User extends newUser {
    _id: ObjectId | string
    admin: boolean
}

//TODO: strain data through safeUser in appropriate places, on the server side
export interface safeUser extends Extras{
    _id: ObjectId
    firstName: string
    lastName: string
    username: string
    friends?: ObjectId[]
    image?: string
}

export const showLoginModal = ref(false);

const API = "users";

export async function addUser(newUser: newUser): Promise<User> {
    return (await api<User>(API, newUser, "POST")).data;
}

export async function getUsers(): Promise<User[]> {
    safetyCheck(true);
    return (await api<User[]>(API)).data;
}

//TODO: add safeguards to prevent data leakage
export async function getUser(id: ObjectId | string): Promise<User> {
    return (await api<User>(`${API}/${id}`)).data;
}

//TODO: implement adding friends in workout box
export async function addFriend(friend: string | ObjectId): Promise<User> {
    let user = safetyCheck(false);
    user.friends ? user.friends.push(friend) : user.friends = [friend];
    return await updateUser(user);
}

export async function searchUsers(query: string | string[]): Promise<User[]> {
    if (typeof query === "object") query = query.join("+");
    return (await api<User[]>(`${API}/search?q=${query}`)).data;
}

//TODO: implement removing friends in workout box
export async function removeFriend(friend: string | ObjectId): Promise<User> {
    let user = safetyCheck(false);
    if(!user.friends || user._id === friend) return user;
    user.friends = user.friends.filter(f => f !== friend);
    return await updateUser(user);
}

export async function updateUser(user: User): Promise<User> {
    safetyCheck(false, user, true);
    return (await api<User>(`${API}/${user._id}`, user, "PATCH")).data;
}

export async function deleteUser(user: User): Promise<User> {
    safetyCheck(false, user, true);
    return (await api<User>(`${API}/${user._id}`, user, "DELETE")).data;
}

function safetyCheck(adminCheck: boolean, user?: User, sessionCheck?: boolean) : User  {
    const sessionUser = getSession().user;
    if(!sessionUser) throw new MyError(401, "User not logged in");
    if ((adminCheck && !sessionUser.admin) || (sessionCheck && user !== sessionUser)) throw new MyError(403, "User not authorized");
    return sessionUser;
}
