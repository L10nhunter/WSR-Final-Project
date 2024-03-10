import data from '@/data/workouts.json';
import {type User} from "@/model/users";

export interface Workout {
    user: User
    id: string
    title: string
    time: number
    duration: number
    distance?: number
    calories?: number
    location: {
        latitude: string
        longitude: string
    } | string
    picture?: string
    type: string
}

export function getWorkouts(): Workout[] {
    return data.items;
}

export function getWorkoutsByUser(user?: User): Workout[] {
    return data.items.filter(workout => workout.user.id === user?.id);
}