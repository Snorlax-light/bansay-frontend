<template>
  <q-page class="bg-grey-2 flex flex-center">
    <div class="container">
      <q-form @submit.prevent="handleRegister" ref="registerForm">
        <div class="logo-header">
          <img :src="logo" alt="Bansay Logo" class="logo" />
          <h2 class="app-title">Bansay App</h2>
        </div>

        <h1 class="register-title">Register</h1>

        <div class="input-box">
          <q-input
            filled
            v-model="firstName"
            label="First Name"
            placeholder="Enter first name"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please enter your first name']"
          >
            <template v-slot:append>
              <q-icon name="mdi-account" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-input
            filled
            v-model="lastName"
            label="Last Name"
            placeholder="Enter last name"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please enter your last name']"
          >
            <template v-slot:append>
              <q-icon name="mdi-account" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-input
            filled
            v-model="username"
            label="Username"
            placeholder="Enter username"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please enter your username']"
          >
            <template v-slot:append>
              <q-icon name="mdi-account-circle" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-input
            filled
            v-model="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please enter your email']"
          >
            <template v-slot:append>
              <q-icon name="mdi-email" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-input
            filled
            v-model="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please enter your password']"
          >
            <template v-slot:append>
              <q-icon name="mdi-lock" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-input
            filled
            v-model="confirmPassword"
            label="Retype Password"
            placeholder="Confirm password"
            type="password"
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :error="!!passwordError"
            :error-message="passwordError"
            :rules="[(val) => !!val || 'Please enter your password again']"
          >
            <template v-slot:append>
              <q-icon name="mdi-lock-check" color="indigo" />
            </template>
          </q-input>
        </div>
        <div class="input-box">
          <q-select
            filled
            v-model="selectedRole"
            label="Select Role"
            :options="roles"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            color="indigo"
            bg-color="indigo-2"
            dense
            clearable
            :rules="[(val) => !!val || 'Please select a role']"
          >
            <template v-slot:append>
              <q-icon name="mdi-account-switch" color="indigo" />
            </template>
          </q-select>
        </div>

        <q-btn type="submit" color="indigo" label="Register" class="full-width" />
        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>

        <p>Or register with</p>
        <div class="social-icons">
          <q-btn round color="red" icon="mdi-google" size="10px" />
          <q-btn round color="blue-8" icon="mdi-facebook" size="10px" />
          <q-btn round color="black" icon="mdi-github" size="10px" />
          <q-btn round color="blue-9" icon="mdi-linkedin" size="10px" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import '../../assets/styles/auth.css';
import { useRouter } from 'vue-router';
import { QBtn, QForm } from 'quasar';
import logo from '../../assets/logo.png';

export default defineComponent({
  name: 'RegisterPage',
  components: { QBtn, QForm },
  setup() {
    const router = useRouter();

    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const selectedRole = ref(null);
    const passwordError = ref('');
    const registerForm = ref<QForm | null>(null);

    const roles = [
      { label: 'Student', value: 'student' },
      { label: 'Officer', value: 'officer' },
      { label: 'Admin', value: 'admin' },
    ];

    const handleRegister = async () => {
      const valid = await registerForm.value?.validate();
      if (valid !== true) return;

      if (password.value !== confirmPassword.value) {
        passwordError.value = 'Passwords do not match';
        return;
      }

      if (!selectedRole.value) {
        alert('Please select a role.');
        return;
      }

      if (selectedRole.value === 'student') void router.push('/student-dashboard');
      else if (selectedRole.value === 'officer') void router.push('/officer-dashboard');
      else if (selectedRole.value === 'admin') void router.push('/admin-dashboard');
    };

    watch([password, confirmPassword], () => {
      if (confirmPassword.value && password.value !== confirmPassword.value) {
        passwordError.value = 'Passwords do not match';
      } else {
        passwordError.value = '';
      }
    });

    return {
      logo,
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      selectedRole,
      passwordError,
      roles,
      registerForm,
      handleRegister,
    };
  },
});
</script>
