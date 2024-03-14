<script setup lang="ts">
import {workoutTypes} from "@/model/workouts";
import {Users, type User} from "@/model/users";
import {getTextField} from "@/model/textField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";
import {ref} from "vue";

const user = defineProps<User>();

const editedUser = ref<User>(user);

console.log(user);
console.log(editedUser.value);

const emits = defineEmits<{
    (event: 'hideModal', value: void): void;
    (event: 'editUser', value: User): void;
}>();

const textFields = [
    {field: getTextField("First Name"), model: editedUser.value.firstName},
    {field: getTextField("Last Name"), model: editedUser.value.lastName},
    {field: getTextField("EmailReg"), model: editedUser.value.email},
    {field: getTextField("Phone"), model: editedUser.value.phone},
    {field: getTextField("Username"), model: editedUser.value.username},
    {field: getTextField("PasswordReg"), model: editedUser.value.password},
    ];
</script>

<template>
    <div class="modal">
        <div class="modal-background" @click="emits('hideModal')"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Add a Workout</p>
                <button class="delete" @click="emits('hideModal')" aria-label="close"></button>
            </header>
            <section class="modal-content dcs">
                <div class="form">
                    <WorkoutTextField v-for="text in textFields" v-bind="text.field" v-model="text.model"/>
                    <div class="field">

                    </div>
                </div>
            </section>
            <footer class="modal-card-foot dcs">
                <button class="button is-primary" @submit.prevent @click="emits('editUser', editedUser)">Edit User</button>
                <button class="button has-text-weight-bold" @click="emits('hideModal')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<style scoped>

</style>