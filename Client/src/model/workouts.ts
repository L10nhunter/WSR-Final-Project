import {type safeUser, type User} from "@/model/users";
import {getUser} from "@/model/session";
import {api} from "@/model/session";
import type {ObjectId} from "mongodb";

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
    _id: ObjectId
}

export const workoutTypes = ["Run", "Walk", "Bike", "Swim", "Cardio", "Strength", "Other"];
const API = "workouts";

export async function getAllWorkouts(): Promise<Workout[]> {
    return await api(API) as Workout[];
}

export async function workoutsBySessionID(): Promise<Workout[]> {
    return await getWorkoutsByUserID(getUser()?._id) as Workout[];
}

export async function getWorkoutsByUserID(userID?: ObjectId): Promise<Workout[]> {
    return await api(`${API}/user/${userID}`) as Workout[];
}

export async function addWorkout(newWorkout: NewWorkout): Promise<void> {
    return await api(API, newWorkout, "POST");
}

export async function getWorkoutsByUser(user?: User): Promise<Workout[]> {
    return await getWorkoutsByUserID(user?._id) as Workout[];
}

export async function getWorkoutByType(type: string, user?: User): Promise<Workout[]> {
    if (type === "All") return user ? await getWorkoutsByUser(user) : [];
    return user
        ? await getWorkoutsByUser(user)
            .then(workouts => workouts.filter(workout => workout.type === type))
        : await getAllWorkouts()
            .then(workouts => workouts.filter(workout => workout.type === type));
}