<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import "bulma/css/bulma.css";
import "@/assets/main.css";

const user = {
    firstName: ref(''),
    lastName: ref(''),
    email: ref(''),
    password: ref(''),
    passwordCheck: ref('')
};
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function isValid(): boolean {
    return true;
}

const boxes = ref<NodeListOf<HTMLInputElement>>();

onMounted(() => {
    boxes.value = document.querySelectorAll('input');
    console.log(boxes.value)
    for (let box of boxes.value) {
        box.addEventListener('input', () => function () {
            if (box.name === 'firstname') {
                user.firstName.value = box.value;
                console.log(user.firstName.value);
            }
            if (box.name === 'lastname') {
                user.lastName.value = box.value;
                console.log(user.lastName.value);
            }
            if (box.name === 'email') {
                user.email.value = box.value;
                console.log(user.email.value);
            }
            if (box.name === 'password') {
                user.password.value = box.value;
                console.log(user.password.value);
            }
            if (box.name === 'passwordcheck') {
                user.passwordCheck.value = box.value;
                console.log(user.passwordCheck.value);
            }
        });
        console.log("Event Listener added to " + box.name);
    }
    console.log('mounted');
});

onBeforeUnmount(() => {
    for (let box of boxes.value!) {
        box.removeEventListener('input', () => function () {
            console.log(box.name + ' ' + box.value);
            if (box.name === 'firstname') {
                user.firstName.value = box.value;
            }
            if (box.name === 'lastname') {
                user.lastName.value = box.value;
            }
            if (box.name === 'email') {
                user.email.value = box.value;
            }
            if (box.name === 'password') {
                user.password.value = box.value;
            }
            if (box.name === 'passwordcheck') {
                user.passwordCheck.value = box.value;
            }
        });
    }
    console.log('unmounted');
});

</script>

<template>
    <div>
        <form>
            <h2>Register</h2>
            <div class="control">
                <label class="label">First Name</label>
                <input required class="input" type="text" placeholder="John" name="firstname" id="firstname">
            </div>
            <div>
                <label class="label">Last Name</label>
                <input required class="input" type="text" placeholder="Smith" name="lastname" id="lastname">
            </div>
            <div>
                <label class="label">Email</label>
                <input required class="input" type="text" placeholder="johnsmith@gmail.com" name="email" id="email">
            </div>
            <div>
                <label class="label">Password</label>
                <input required class="input" type="text" placeholder="" name="password" id="password">
            </div>
            <div>
                <label class="label">Password Verification</label>
                <input required class="input" type="text" placeholder="" name="passwordcheck" id="passwordcheck">
            </div>
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input required type="checkbox">
                        I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
@media (prefers-color-scheme: dark) {
    label {
        color: white;
    }
}
@media (prefers-color-scheme: light) {
    label {
        color: black;
    }
}

</style>
```

