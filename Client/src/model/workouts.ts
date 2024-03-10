import data from '@/data/workouts.json';
import {type User} from "@/model/users";

export interface Workout {
    user: User
    id: string
    title: string
    date: string
    time: string
    duration: number
    distance?: number
    calories?: number
    location:
    {
        latitude: string
        longitude: string
    }
    picture: string
    type: string
}

export function getWorkouts(): Workout[] {
    return data.items as Workout[];
}