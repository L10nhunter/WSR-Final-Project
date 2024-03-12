// Purpose: Contains global variables and functions that are used across multiple components.
import {computed, ref} from "vue";
import {getUsers} from "@/model/users";

const users = computed(() => getUsers());
export const LoggedInUser = ref(users.value.find(user => user.id === 0));

// this will at some point be a call to the server to get the user
export function updateLoggedInUser(userId?: number): void {
    LoggedInUser.value = users.value.find(user => user.id === userId);
}

