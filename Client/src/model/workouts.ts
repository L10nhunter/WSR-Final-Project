import data from '@/data/workouts.json';
import {type User, LoggedInUser} from "@/model/users";
import {computed} from "vue";

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

export const workoutTypes = ["Run", "Walk", "Bike", "Swim", "Cardio", "Strength", "Other"]
export const workoutsByID = computed<Workout[]>( () => data.items.filter(workout => workout.user.id === LoggedInUser.value?.id)) ;

export function getWorkouts(): Workout[] {
    return data.items;
}

export function getWorkoutsByUser(user?: User): Workout[] {
    return data.items.filter(workout => workout.user.id === user?.id);
}

export function getWorkoutByType(type: string, user?: User): Workout[] {
    if(type === "All") return user ? getWorkoutsByUser(user) : [];
    return user ? getWorkoutsByUser(user).filter(workout => workout.type === type) : data.items.filter(workout => workout.type === type);
}