import {type User} from "@/model/users";
import {getUser} from "@/model/session";
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

export async function getAllWorkouts(): Promise<Workout[]> {
    const workouts = await api<Workout[]>(API)
    return workouts.data;
}

export async function workoutsBySessionID(): Promise<Workout[]> {
    return await getWorkoutsByUserID(getUser()?._id);
}

export async function getWorkoutsByUserID(userID?: ObjectId): Promise<Workout[]> {
    const workouts = await api<Workout[]>(`${API}/user/${userID}`);
    return workouts.data;

}

export async function addWorkout(newWorkout: NewWorkout): Promise<Workout> {
    newWorkout.uid = getUser()!._id;
    const workout = await api<Workout>(API, newWorkout, "POST")
    return workout.data;
}

export async function getWorkoutsByUser(user?: User): Promise<Workout[]> {
    return await getWorkoutsByUserID(user?._id);
}

export async function getWorkoutByType(type: string, user?: User): Promise<Workout[]> {
    if (type === "All") return user ? await getWorkoutsByUser(user) : [];
    const workouts = await (user ? getWorkoutsByUser(user) : getAllWorkouts());
    return workouts.filter(workout => workout.type === type);
}

export async function updateWorkout(workout: Workout): Promise<Workout> {
    const ret = await api<Workout>(`${API}/${workout._id}`, workout, "PATCH");
    return ret.data;
}
export async function deleteWorkout(workout: Workout): Promise<Workout> {
    const ret = await api<Workout>(`${API}/${workout._id}`, workout, "DELETE");
    return ret.data;
}