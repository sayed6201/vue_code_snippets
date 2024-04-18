<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="username">Username:</label>
            <input id="username" v-model="username" />
            <div v-if="usernameError" class="error">{{ usernameError }}</div>
        </div>
        <div>
            <label for="email">Email:</label>
            <input id="email" v-model="email" />
            <div v-if="emailError" class="error">{{ emailError }}</div>
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" type="password" v-model="password" />
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
        </div>
        <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input id="confirmPassword" type="password" v-model="confirmPassword" />
            <div v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</div>
        </div>
        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { ref, computed } from 'vue';

// Define reactive variables for form fields
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Define computed properties for displaying validation errors
const usernameError = computed(() => $v.username.$error ? $v.username.$message : '');
const emailError = computed(() => $v.email.$error ? $v.email.$message : '');
const passwordError = computed(() => $v.password.$error ? $v.password.$message : '');
const confirmPasswordError = computed(() => $v.confirmPassword.$error ? $v.confirmPassword.$message : '');

// Define validation rules for each form field
const validations = {
    username: {
        required,
        minLength: minLength(3),
    },
    email: {
        required,
        email,
    },
    password: {
        required,
        minLength: minLength(8),
        strongPassword(value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
        },
    },
    confirmPassword: {
        required,
        sameAsPassword: sameAs(password),
    },
};

// Handle form submission
const submitForm = () => {
    if ($v.$invalid) {
        return;
    }
    // Perform registration logic here
};
</script>

<style>
.error {
    color: red;
}
</style>
