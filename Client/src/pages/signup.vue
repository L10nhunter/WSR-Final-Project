<script setup lang="ts">
import {ref} from "vue";
import "bulma/css/bulma.css";
import "../assets/main.css";
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {getTextField} from "@/model/textField";
import {addUser, getUserByLoginCredentials, updateLoggedInUser, Users} from "@/model/users";

const {login} = updateLoggedInUser();

const user = {
    firstName: ref(''),
    lastName: ref(''),
    username: ref(''),
    email: ref(''),
    phone: ref(''),
    password: ref(''),
    passwordCheck: ref(''),
    tosAccept: ref(false),
};
const textFields = [
    {field: getTextField("First Name"), model: user.firstName},
    {field: getTextField("Last Name"), model: user.lastName},
    {field: getTextField("EmailReg"), model: user.email},
    {field: getTextField("Phone"), model: user.phone},
    {field: getTextField("Username"), model: user.username},
    {field: getTextField("PasswordReg"), model: user.password},
    {field: getTextField("PasswordVerification"), model: user.passwordCheck}
]

const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const enableSubmit = ref(false);

function addNewUser(user: any) {
    addUser({
        id: Users.value[-1].id + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        password: user.password,
        admin: false,
    });
    login(getUserByLoginCredentials(user.username, user.password));
}

function isValid(): void {
    console.log("");
    console.log("validating:");
    console.log("first name: " + isValidFirstName());
    console.log("last name: " + isValidLastName());
    console.log("username: " + isValidUsername());
    console.log("email: " + isValidEmail());
    console.log("password: " + isValidPassword());
    console.log("password check: " + isValidPasswordCheck());
    console.log("tos: " + isValidTos());
    enableSubmit.value = isValidFirstName() && isValidLastName() && isValidUsername() && isValidEmail() && isValidPassword() && isValidPasswordCheck() && isValidTos();
    console.log("enable submit: " + enableSubmit.value);
}
function isValidFirstName(): boolean {return user.firstName.value !== '';}
function isValidLastName(): boolean {return user.lastName.value !== '';}
function isValidUsername(): boolean {return usernameRegex.test(user.username.value);}
function isValidEmail(): boolean {return emailRegex.test(user.email.value);}
function isValidPassword(): boolean {return passwordRegex.test(user.password.value);}
function isValidPasswordCheck(): boolean {return user.passwordCheck.value === user.password.value;}
function isValidTos(): boolean {return user.tosAccept.value;}


</script>

<template>
    <div>
        <h1 class="is-size-1 has-text-weight-bold dcs">Register</h1>
        <form autocomplete="on">
            <SignupTextField v-for="text in textFields" v-bind="text.field" v-model=text.model.value @input="isValid()"/>
            <div class="field">
                <label>User TOS accept: {{user.tosAccept.value}}</label>
                <div class="control">
                    <label class="dcs is-hovered-soft">
                        <input type="checkbox" v-model="user.tosAccept.value" @input="isValid()" name="tosAccept">
                        I agree to the <a class="link" href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" :disabled="!user.tosAccept.value" @click.prevent="addNewUser(user)">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
a.link:hover{
    text-decoration: underline;
    color: #485fc7
}

</style>