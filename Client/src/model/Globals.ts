// Purpose: Contains global variables and functions that are used across multiple components.
import {ref} from "vue";
import {getUsers} from "@/model/users";
import {getWorkouts} from "@/model/workouts";

export const users = ref(getUsers());
const userID = ref(31);

export const workouts = ref(getWorkouts())
export const LoggedInUser = ref(users.value.find(user => user.id === userID.value));

export function updateLoggedInUser(userId: number) {
    console.log("Updating logged in user");
    LoggedInUser.value = users.value.find(user => user.id === userId);
}

export function distanceFormat(distance: number) {
    if (distance > 5280) {
        return (distance / 5280).toFixed(2) + " mi";
    }
    return distance.toFixed(2) + " ft";
}

export function durationFormat(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return (hours<10 ? "0"+ hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

export function paceFormat(pace?: number) {
    if (!pace) return "0 mi/h";
    if (pace < 1) return (pace * 88).toFixed(2) + " ft/min";
    return pace.toFixed(2) + " mi/h";

}

export function caloriesFormat(calories: number) {
    if(calories > 1000) return (calories/1000).toFixed(2) + " kcal";
    return calories + " cal";
}