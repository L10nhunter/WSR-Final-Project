// Purpose: Contains global variables and functions that are used across multiple components.
import {ref} from "vue";
import {getUsers} from "@/model/users";

const users = ref(getUsers());
const userID = ref(31);
export const LoggedInUser = ref(users.value.find(user => user.id === userID.value));

// this will at some point be a call to the server to get the user
/*export function updateLoggedInUser(userId: number) {
    console.log("Updating logged in user");
    LoggedInUser.value = users.value.find(user => user.id === userId);
}*/

