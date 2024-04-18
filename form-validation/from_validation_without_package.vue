<script setup>
import { ref , computed } from 'vue';

const startValidation = ref(false);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

function register() {
  startValidation.value = true;

  if (isValidEmail.value == true && isStrongPassword.value == true && isPasswordConfirmed.value == true ) {
    // send data to api here
    alert("registering...");
  }
}


const isValidEmail = computed(() => {
     return startValidation.value ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) : null;
});

const isStrongPassword = computed(() => {
     return startValidation.value ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password.value) : null;
});

const isPasswordConfirmed = computed(() => {
     return startValidation.value ? password.value == confirmPassword.value : null;
});
</script>

<template>
 <div v-if="startValidation && email != '' && !isValidEmail">invalid email address</div>
 <input :class="{ valid : isValidEmail == true , inValid : isValidEmail == false}" v-model="email" type="text" placeholder="Email"> <br>
 
 <div v-if="startValidation && password != '' && !isStrongPassword">weak password!</div>
 <input :class="{ valid : isStrongPassword == true , inValid : isStrongPassword == false}" v-model="password" type="" placeholder="Password"> <br>

 <input :class="{ valid : isPasswordConfirmed == true , inValid : isPasswordConfirmed == false}" v-model="confirmPassword" type="" placeholder="Confirm password"> <br>
 <br>
<button @click="register">Register</button>

</template>

<style scoped>
.valid {
background: url('ok.svg') no-repeat right;
background-size: auto 100%;
}
.inValid {
background: url('bad.svg') no-repeat right;
background-size: auto 100%;
}
</style>