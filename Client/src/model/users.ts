import data from '@/data/users.json';

export interface User {
    id: number
    admin: boolean
    firstName: string
    lastName: string
    maidenName?: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
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
    address: {
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
        address: {
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
export function getUsers(): User[] {
    return data.items;
}

export function getUserByLoginCredentials(emailOrUsername: string, password: string): User | undefined {
    if(emailOrUsername.includes('@'))  return data.items.find(user => user.email === emailOrUsername && user.password === password)
    return data.items.find(user => user.username === emailOrUsername && user.password === password);
}

export function getUserByFullName(fullName: string): User | undefined {
    const names = fullName.split(' ');
    return getUserByName(names[0], names[1]);
}
function getUserByName(firstName: string, lastName: string): User | undefined {
    return data.items.find(user => user.firstName === firstName && user.lastName === lastName);
}
