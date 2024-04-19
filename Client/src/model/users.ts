import {ref} from "vue";
import {api} from "@/model/rest";
import type {ObjectId} from "mongodb";

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
    friends?: number[]
    image?: string
}
export const showLoginModal = ref(false);

const API = "users";

export async function addUser(newUser: newUser): Promise<User> {
    const user = await api<User>(API, newUser, "POST");
    return user.data;
}

export async function getUsers(): Promise<User[]> {
    const users  = await api<User[]>(API);
    return users.data;
}

export async function getUser(id: ObjectId): Promise<User> {
    const user  = await api<User>(`${API}/${id}`);
    return user.data;
}

export async function addFriend(user: User, friend: User): Promise<User> {
    user.friends ? user.friends.push(friend._id) : user.friends = [friend._id];
    return await updateUser(user);
}

export async function updateUser(user: User): Promise<User> {
    const ret  = await api<User>(`${API}/${user._id}`, user, "PATCH");
    return ret.data;
}

export async function deleteUser(user: User): Promise<User> {
    const ret  = await api<User>(`${API}/${user._id}`, undefined, "DELETE");
    return ret.data;
}
