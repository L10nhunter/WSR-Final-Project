import {ref} from "vue";
import {api} from "@/model/session";

export interface newUser {
    firstName: string
    lastName: string
    email: string
    phone: string
    username: string
    password: string
    friends?: number[]

    maidenName?: string
    age?: number
    gender?: string
    birthDate?: string
    image?: string
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
export interface User extends newUser{
    id: number
    admin: boolean
}
export interface safeUser {
    id: number
    firstName: string
    lastName: string
    username: string
    friends?: number[]
    image?: string
}
export const showLoginModal = ref(false);

export async function addUser(newUser: newUser): Promise<User> {
    return await api("users", newUser, "POST");
}

export async function getUsers(): Promise<User[]> {
    return await api("users") as User[];
}

export async function updateUser(user: User): Promise<User> {
    return await api(`users/${user.id}`, user, "PUT");
}

export async function deleteUser(user: User): Promise<User> {
    return await api(`users/${user.id}`, undefined, "DELETE");
}
