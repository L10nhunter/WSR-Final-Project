<script setup lang="ts">
import {ref} from "vue";
import "bulma/css/bulma.css";
import "../assets/main.css";
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {getTextFieldsFromLabels} from "@/model/TextField";


const user = {
    firstName: ref(''),
    lastName: ref(''),
    username: ref(''),
    email: ref(''),
    password: ref(''),
    passwordCheck: ref(''),
    tosAccept: ref(false),
};
const indices = [0, 1, 2, 3, 4, 5];
const textFields = getTextFieldsFromLabels(["First Name", "Last Name", "EmailReg", "Username", "PasswordReg", "PasswordVerification"]);
const models = [user.firstName, user.lastName, user.email, user.username, user.password, user.passwordCheck];


const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const enableSubmit = ref(false);

function isValid(): void {
    enableSubmit.value = isValidFirstName() && isValidLastName() && isValidUsername() && isValidEmail() && isValidPassword() && isValidPasswordCheck() && user.tosAccept.value;
}
function isValidFirstName(): boolean {return user.firstName.value !== '';}
function isValidLastName(): boolean {return user.lastName.value !== '';}
function isValidUsername(): boolean {return user.username.value !== '';}
function isValidEmail(): boolean {return (user.email.value !== '') && emailRegex.test(user.email.value);}
function isValidPassword(): boolean {return (user.password.value !== '') && passwordRegex.test(user.password.value);}
function isValidPasswordCheck(): boolean {return user.passwordCheck.value === user.password.value;}
</script>

<template>
    <div>
        <h1 class="is-size-1 has-text-weight-bold dcs">Register</h1>
        <form autocomplete="on">
            <SignupTextField v-for="index in indices" v-bind="textFields[index]" v-model=models[index].value @input="isValid()"/>
            <div class="field">
                <div class="control">
                    <label class="checkbox dcs is-hovered-text">
                        <input type="checkbox" v-model="user.tosAccept.value" @input="isValid()" name="tosAccept">
                        I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" :disabled="!enableSubmit">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>

</style>