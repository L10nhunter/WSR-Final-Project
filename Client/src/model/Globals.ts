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