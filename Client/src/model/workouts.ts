import data from '../../../Server/data/workouts.json';
import {type User} from "@/model/users";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {getUser} from "@/model/session";

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
export const workoutsBySessionID = computed<Workout[]>(() => {
    return Workouts.value.filter(workout => workout.user.id === getUser()?.id);
});



export function toReversed(workouts: Workout[]): Workout[] {
    return workouts.slice().reverse();
}
export function addWorkout(workout: Workout): void {
    const router = useRouter();
    Workouts.value.push(workout);
    workoutsBySessionID.value.push(workout);
    router.push(router.currentRoute.value).then(r => r);
}

export function getWorkoutsByUser(user?: User): Workout[] {
    return Workouts.value.filter(workout => workout.user.id === user?.id);
}

export function getWorkoutByType(type: string, user?: User): Workout[] {
    if(type === "All") return user ? getWorkoutsByUser(user) : [];
    return user ? getWorkoutsByUser(user).filter(workout => workout.type === type) : Workouts.value.filter(workout => workout.type === type);
}