import {type safeUser, type User} from "@/model/users";
import {getUser} from "@/model/session";
import {api} from "@/model/session";
export interface NewWorkout {
    user: safeUser
    title: string
    time: number
    duration?: number
    distance?: number
    calories?: number
    location?: string
    picture?: string
    type: string
    imageURL?: string
    comments?: string[]
}
export interface Workout extends NewWorkout {
    id: number
}

export const workoutTypes = ["Run", "Walk", "Bike", "Swim", "Cardio", "Strength", "Other"];

export async function getAllWorkouts(): Promise<Workout[]> {
    return await api("workouts") as Workout[];
}
export async function workoutsBySessionID() : Promise<Workout[]> {
    return await getWorkoutsByUserID(getUser()?.id ?? -1) as Workout[];
}

export async function getWorkoutsByUserID(userID: number): Promise<Workout[]> {
    return await api(`workouts/user?uid=${userID}`) as Workout[];
}

export function toReversed(workouts: Workout[]): Workout[] {
    return workouts.slice().reverse();
}
export async function addWorkout(newWorkout: NewWorkout): Promise<void> {
    return await api("workouts", newWorkout, "POST");
}

export async function getWorkoutsByUser(user?: User): Promise<Workout[]> {
    return await getWorkoutsByUserID(user?.id ?? -1) as Workout[];
}

export async function getWorkoutByType(type: string, user?: User): Promise<Workout[]> {
    if(type === "All") return user ? await getWorkoutsByUser(user) : [];
    return user ? await getWorkoutsByUser(user).then(workouts => workouts.filter(workout => workout.type === type)) : await getAllWorkouts().then(workouts=> workouts.filter(workout => workout.type === type));
}