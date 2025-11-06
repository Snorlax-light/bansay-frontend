<template>
  <div class="auth-wrapper">
    <div class="container" :class="{ 'right-panel-active': isSignUpActive }">
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1>Create Account</h1>
          <input v-model="signUpForm.name" type="text" placeholder="Name" />
          <input v-model="signUpForm.email" type="email" placeholder="Email" />
          <input v-model="signUpForm.password" type="password" placeholder="Password" />
          <input v-model="signUpForm.password" type="password" placeholder="Confirm Password" />
          <button type="submit">Register</button>
          <div class="divider"></div>
          <div class="social-container">

            <a href="#" class="social">
              <img src="/src/assets/google_logo_icon.png" alt="Google" style="width: 20px; height: 20px;" />
              <span>Continue with Google</span>
            </a>

          </div>

        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="handleSignIn">
          <h1>Login</h1>
          <input v-model="signInForm.email" type="email" placeholder="Email" />
          <input v-model="signInForm.password" type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="submit">Login</button>
          <div class="divider"></div>
          <div class="social-container">

            <a href="#" class="social">
              <img src="/src/assets/google_logo_icon.png" alt="Google" style="width: 20px; height: 20px;" />
              <span>Continue with Google</span>
            </a>

          </div>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <img src="/src/assets/CICSlogo.png" alt="Logo" class="overlay-logo" />
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button type="button" class="ghost" @click="togglePanel(false)">Login</button>
          </div>
          <div class="overlay-panel overlay-right">
            <img src="/src/assets/CICSlogo.png" alt="Logo" class="overlay-logo" />
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button type="button" class="ghost" @click="togglePanel(true)">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface SignInForm {
  email: string;
  password: string;
}

const isSignUpActive = ref<boolean>(false);

const signUpForm = ref<SignUpForm>({
  name: '',
  email: '',
  password: ''
});

const signInForm = ref<SignInForm>({
  email: '',
  password: ''
});

const togglePanel = (showSignUp: boolean): void => {
  isSignUpActive.value = showSignUp;
};

const handleSignUp = (): void => {
  console.log('Sign Up:', signUpForm.value);
};

const handleSignIn = (): void => {
  console.log('Sign In:', signInForm.value);
};
</script>


<style scoped>


* {
  box-sizing: border-box;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f6f5f7;
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
}

h1 {
  font-weight: bold;
  margin: 0;
  font-size: 28px;
}

.form-container h1 {
  color: #0ea5e9;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 10px;
  border: 1px solid #0ea5e9;
  background-color: #0ea5e9;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  width: 100%;
  margin: 8px 0;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
              0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 550px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #0ea5e9;
  background: -webkit-linear-gradient(to right, #0ea5e9, #0ea5e9);
  background: linear-gradient(to right, #0ea5e9, #0ea5e9);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}

.social-container {
  width: 100%;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  padding: 12px 15px;
  width: 100%;
  gap: 10px;
  background-color: #fff;
}

.overlay-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 5px;
  object-fit: contain;
}
</style>
