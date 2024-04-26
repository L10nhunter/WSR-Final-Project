import {type User} from "@/model/users";
import {getSession} from "@/model/session";
import {api} from "@/model/rest";
import type {ObjectId} from "mongodb";

export interface NewWorkout {
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
    uid: ObjectId
}

export interface Workout extends NewWorkout {
    _id: ObjectId
}

export const workoutTypes = ["Run", "Walk", "Bike", "Swim", "Cardio", "Strength", "Other"];
const API = "workouts";

//TODO: add safeguards to prevent data leakage
export async function getAllWorkouts(): Promise<Workout[]> {
    return (await api<Workout[]>(API)).data;
}
//TODO: add safeguards to prevent data leakage
export async function workoutsBySessionID(): Promise<Workout[]> {
    return await getWorkoutsByUserID(getSession().user?._id);
}
//TODO: add safeguards to prevent data leakage
export async function getWorkoutsByUserID(userID?: ObjectId | string): Promise<Workout[]> {
    return (await api<Workout[]>(`${API}/user/${userID}`)).data;
}
//TODO: add safeguards to prevent data leakage
export async function addWorkout(newWorkout: NewWorkout): Promise<Workout> {
    newWorkout.uid = getSession().user!._id;
    return (await api<Workout>(API, newWorkout, "POST")).data;
}
//TODO: add safeguards to prevent data leakage
export async function getWorkoutsByUser(user?: User): Promise<Workout[]> {
    return await getWorkoutsByUserID(user?._id);
}
//TODO: add safeguards to prevent data leakage
export async function getWorkoutByType(type: string, user?: User): Promise<Workout[]> {
    if (type === "All") return user ? await getWorkoutsByUser(user) : [];
    const workouts = await (user ? getWorkoutsByUser(user) : getAllWorkouts());
    return workouts.filter(workout => workout.type === type);
}
//TODO: add safeguards to prevent data leakage
export async function updateWorkout(workout: Workout): Promise<Workout> {
    return (await api<Workout>(`${API}/${workout._id}`, workout, "PATCH")).data;
}
//TODO: add safeguards to prevent data leakage
export async function deleteWorkout(workout: Workout): Promise<Workout> {
    return (await api<Workout>(`${API}/${workout._id}`, workout, "DELETE")).data;
}