<script setup lang="ts">
import {ref} from "vue";
import "bulma/css/bulma.css";
import "../assets/main.css";
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {getTextField} from "@/model/textField";


const user = {
    firstName: ref(''),
    lastName: ref(''),
    username: ref(''),
    email: ref(''),
    password: ref(''),
    passwordCheck: ref(''),
    tosAccept: ref(false),
};
const textFields = [
    {field: getTextField("First Name"), model: user.firstName},
    {field: getTextField("Last Name"), model: user.lastName},
    {field: getTextField("EmailReg"), model: user.email},
    {field: getTextField("Username"), model: user.username},
    {field: getTextField("PasswordReg"), model: user.password},
    {field: getTextField("PasswordVerification"), model: user.passwordCheck}
]


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
            <SignupTextField v-for="text in textFields" v-bind="text.field" v-model=text.model.value @input="isValid()"/>
            <div class="field">
                <div class="control">
                    <label class="checkbox dcs is-hovered-soft">
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