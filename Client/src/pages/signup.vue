<script setup lang="ts">
import {ref} from "vue";
import "bulma/css/bulma.css";
import "../assets/main.css";
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {getTextField} from "@/model/textField";
import {addUser, type newUser} from "@/model/users";
import {useLogin} from "@/model/session";

const {login} = useLogin();

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
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const enableSubmit = ref(false);

function newUser(): newUser {
    return {
        firstName: user.firstName.value,
        lastName: user.lastName.value,
        username: user.username.value,
        email: user.email.value,
        phone: user.phone.value,
        password: user.password.value,
    }
}
async function addNewUser(user: newUser) {
    await addUser(user)
        .then((user) => login(user.username, user.password))
        .catch(() => {return});
}

function isValidFirstName(): boolean {return user.firstName.value !== '';}
function isValidLastName(): boolean {return user.lastName.value !== '';}
function isValidUsername(): boolean {return usernameRegex.test(user.username.value);}
function isValidPhone(): boolean {return phoneRegex.test(user.phone.value);}
function isValidEmail(): boolean {return emailRegex.test(user.email.value);}
function isValidPassword(): boolean {return passwordRegex.test(user.password.value);}
function isValidPasswordCheck(): boolean {return user.passwordCheck.value === user.password.value;}
function isValidTos(): boolean {return user.tosAccept.value;}

async function isValid(): Promise<void> {
    enableSubmit.value = isValidTos() && isValidFirstName() && isValidLastName() && isValidUsername() && isValidPhone() && isValidEmail() && isValidPassword() && isValidPasswordCheck();
}

</script>

<template>
    <div>
        <h1 class="is-size-1 has-text-weight-bold dcs has-text-centered">Register</h1>
        <form autocomplete="on">
            <SignupTextField v-for="text in textFields" v-bind="text.field" v-model=text.model.value @update:modelValue="isValid()"/>
            <div class="field pl-3">
                <div class="control">
                    <label class="dcs is-hovered-soft">
                        <input type="checkbox" v-model="user.tosAccept.value" @change="isValid()" name="tosAccept">
                        I agree to the <a class="link" href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <div class="field pl-3">
                <div class="control">
                    <button class="button is-primary" :disabled="!enableSubmit" @click.prevent="addNewUser(newUser())">Submit</button>
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