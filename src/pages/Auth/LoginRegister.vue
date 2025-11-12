<template>
  <q-page class="bg-grey-2 flex flex-center">
    <div class="container">
      <div class="form-box login" :class="{ active: isLogin }">
        <form>
          <div class="logo-header">
            <img :src="logo" alt="Bansay Logo" class="logo" />
            <h2 class="app-title">Bansay App</h2>
          </div>

          <h1>Login</h1>
          <div class="input-box">
            <input type="text" placeholder="Username" required />
            <i class="bx bxs-user"></i>
          </div>

          <div class="input-box">
            <input type="password" placeholder="Password" required />
            <i class="bx bxs-lock"></i>
          </div>

          <div class="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" class="btn">Login</button>
          <p>
            Don’t have an account?
            <a href="#" @click="toggleView($event, false)">Register</a>
          </p>

          <p>Or login with</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google"></i></a>
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      <div class="form-box register" :class="{ active: !isLogin }">
        <q-form @submit="register">
          <div class="logo-header">
            <img :src="logo" alt="Bansay Logo" class="logo" />
            <h2 class="app-title">Bansay App</h2>
          </div>

          <h1>Register</h1>

          <div class="input-box">
            <input v-model="firstName" type="text" placeholder="First Name" required />
          </div>

          <div class="input-box">
            <input v-model="lastName" type="text" placeholder="Last Name" required />
          </div>

          <div class="input-box">
            <input v-model="userName" type="text" placeholder="Username" required />
            <i class="bx bxs-user"></i>
          </div>

          <div class="input-box">
            <input v-model="email" type="email" placeholder="Email" required />
            <i class="bx bxs-envelope"></i>
          </div>

          <div class="input-box">
            <input type="password" placeholder="Password" v-model="password" required />
            <i class="bx bxs-lock"></i>
          </div>

          <div class="input-box">
            <input
              type="password"
              placeholder="Retype Password"
              v-model="confirmPassword"
              :class="{ 'input-error': passwordError }"
              required
            />
            <i class="bx bxs-lock-alt"></i>
          </div>

          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

          <div class="input-box">
            <select required v-model="role">
              <option value="" disabled selected>Select Role</option>
              <option value="student">Student</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" class="btn">Register</button>

          <p>
            Already have an account?
            <a href="#" @click="toggleView($event, true)">Login</a>
          </p>

          <p>Or register with</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google"></i></a>
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import logo from 'src/assets/logo.png';
import 'boxicons/css/boxicons.min.css';
import { useAuthStore } from 'src/stores/auth-store';
import { type UserRegisterDtoRoleEnum } from 'src/services/sdk';

const authStore = useAuthStore();
const isLogin = ref(true);
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const userName = ref('');
const role = ref('');

const toggleView = (e: Event, showLogin: boolean) => {
  e.preventDefault();
  isLogin.value = showLogin;
};

watch([password, confirmPassword], () => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
  } else {
    passwordError.value = '';
  }
});

async function register() {
  await authStore.register({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    role: role.value as UserRegisterDtoRoleEnum,
    username: userName.value,
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.q-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
}

.container {
  position: relative;
  width: 400px;
  max-width: 90vw;
  background: #f0f4f8;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  text-align: center;
  transition: all 0.4s ease;
}

.form-box {
  display: none;
}

.form-box.active {
  display: block;
}

.input-box {
  position: relative;
  margin: 15px 0;
}

.input-box input,
.input-box select {
  width: 100%;
  padding: 13px 50px 13px 20px;
  background: #cbd5e1;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
}

.input-box input::placeholder {
  color: #4a5568;
  opacity: 1;
}

.input-error {
  border: 2px solid #e74c3c !important;
  background-color: #ffe6e6;
}

.input-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #2d3748;
}

.btn {
  width: 100%;
  height: 48px;
  background: #1e40af;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
}

.logo-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.logo {
  width: 110px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 20%;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 8px 25px rgba(37, 78, 218, 0.25);
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(37, 78, 218, 0.35);
}

.logo {
  animation: fadeInLogo 0.8s ease-in-out;
}

@keyframes fadeInLogo {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.app-title {
  font-size: 30px;
  font-weight: 700;
  color: #2d3748;
  text-transform: uppercase;
}

.login h1,
.register h1 {
  font-size: 30px;
  color: #2d3748;
  margin-bottom: 5px;
  font-weight: 700;
}

p {
  font-size: 14px;
  margin-top: 15px;
}

p a {
  color: #2952e3;
  text-decoration: underline;
  cursor: pointer;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 50%;
  font-size: 20px;
  color: #2d3748;
  margin: 0 5px;
  background: #cbd5e1;
  text-decoration: none;
}

.social-icons a:hover {
  transform: scale(1.1);
  transition: 0.3s ease;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  font-weight: 500;
}
</style>
