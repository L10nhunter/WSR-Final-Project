import data from '../../../Server/data/workouts.json';
import {type User, LoggedIn} from "@/model/users";
import {computed, ref} from "vue";

export interface Workout {
    user: User
    id: number
    title: string
    time: number
    duration?: number
    distance?: number
    calories?: number
    location?: {
        latitude: string
        longitude: string
    } | string
    picture?: string
    type: string
}

export const workoutTypes = ["Run", "Walk", "Bike", "Swim", "Cardio", "Strength", "Other"]
export const Workouts = ref<Workout[]>(data.items);
export const workoutsByID = computed<Workout[]>(() => {
    return Workouts.value.filter(workout => workout.user.id === LoggedIn.user?.id);
});

export function toReversed(workouts: Workout[]): Workout[] {
    return workouts.slice().reverse();
}
export function addWorkout(workout: Workout): void {
    Workouts.value.push(workout);
    workoutsByID.value.push(workout);
}

export function getWorkoutsByUser(user?: User): Workout[] {
    return Workouts.value.filter(workout => workout.user.id === user?.id);
}

export function getWorkoutByType(type: string, user?: User): Workout[] {
    if(type === "All") return user ? getWorkoutsByUser(user) : [];
    return user ? getWorkoutsByUser(user).filter(workout => workout.type === type) : Workouts.value.filter(workout => workout.type === type);
}