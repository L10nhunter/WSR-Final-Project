<script setup lang="ts">
import {ref} from "vue";
import "bulma/css/bulma.css";
import "../assets/main.css";
import SignupTextField from "@/components/SignupTextField.vue";

const user = {
    firstName: ref(''),
    lastName: ref(''),
    username: ref(''),
    email: ref(''),
    password: ref(''),
    passwordCheck: ref(''),
    tosAccept: ref(false),
};
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const enableSubmit = ref(false);

function isValid(): void {
    enableSubmit.value = isValidFirstName() && isValidLastName() && isValidUsername() && isValidEmail() && isValidPassword() && isValidPasswordCheck() && user.tosAccept.value;
    console.log(enableSubmit.value);
    console.log({user});
}
function isValidFirstName(): boolean {
    return user.firstName.value !== '';
}
function isValidLastName(): boolean {
    return user.lastName.value !== '';
}
function isValidUsername(): boolean {
    return user.username.value !== '';
}
function isValidEmail(): boolean {
    return (user.email.value !== '') && emailRegex.test(user.email.value);
}
function isValidPassword(): boolean {
    return (user.password.value !== '') && passwordRegex.test(user.password.value);
}
function isValidPasswordCheck(): boolean {
    return user.passwordCheck.value === user.password.value;
}
</script>

<template>
    <div>
        <h1 class="is-size-1 has-text-weight-bold default-color-scheme">Register</h1>
        <form autocomplete="on">
            <SignupTextField v-model=user.firstName.value @input="isValid()" label="First Name" placeholder="John"/>
            <SignupTextField v-model=user.lastName.value @input="isValid()" label="Last Name" placeholder="Smith"/>
            <SignupTextField v-model=user.email.value @input=" isValid()" label="Email Address" placeholder="johnsmith@gmail.com"/>
            <SignupTextField v-model=user.username.value @input="isValid()" label="Username" placeholder="JohnSmith123"/>
            <SignupTextField v-model=user.password.value @input="isValid()" label="Password" placeholder="Password"/>
            <SignupTextField v-model=user.passwordCheck.value @input="isValid()" label="Password Verification" placeholder="Password"/>
            <div class="field">
                <div class="control">
                    <label class="checkbox default-color-scheme is-hovered-text">
                        <input type="checkbox" v-model="user.tosAccept.value" @input="isValid()" name="tosAccept">
                        I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary has-text-black has-text-weight-bold" :disabled="!enableSubmit">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>

</style>
```

