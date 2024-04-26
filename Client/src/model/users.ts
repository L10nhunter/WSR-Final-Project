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

export interface newUser extends Extras{
    firstName: string
    lastName: string
    email: string
    phone: string
    username: string
    password: string
    friends?: ObjectId[]
    image?: string
}
export interface User extends newUser{
    _id: ObjectId
    admin: boolean
}
export interface safeUser {
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
//TODO: add safeguards to prevent data leakage
export async function getUsers(): Promise<User[]> {
   return (await api<User[]>(API)).data;
}
//TODO: add safeguards to prevent data leakage
export async function getUser(id: ObjectId | string): Promise<User> {
    return (await api<User>(`${API}/${id}`)).data;
}

export async function addFriend(friend: User): Promise<User> {
    const user = getSession().user;
    if(!user) throw new MyError(401, "User not logged in");
    user.friends ? user.friends.push(friend._id) : user.friends = [friend._id];
    return await updateUser(user);
}

export async function updateUser(user: User): Promise<User> {
    const sessionUser = getSession().user;
    if(user !== sessionUser && !sessionUser?.admin) throw new MyError(401, "User not logged in");
    return (await api<User>(`${API}/${user._id}`, user, "PATCH")).data;
}
//TODO: add safeguards to prevent data leakage
export async function deleteUser(user: User): Promise<User> {
    return (await api<User>(`${API}/${user._id}`, user, "DELETE")).data;
}
