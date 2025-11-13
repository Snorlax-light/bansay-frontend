<template>
  <q-page class="bg-grey-2 flex flex-center">
    <div class="container">
      <div class="form-box login" :class="{ active: isLogin }">
        <q-form @submit.prevent="handleLogin">
          <div class="logo-header">
            <img :src="logo" alt="Bansay Logo" class="logo" />
            <h2 class="app-title">Bansay App</h2>
          </div>

          <h1>Login</h1>

          <div class="input-box">
            <input v-model="username" type="text" placeholder="Username" required />
            <q-icon name="mdi-account" class="icon" />
          </div>

          <div class="input-box">
            <input v-model="password" type="password" placeholder="Password" required />
            <q-icon name="mdi-lock" class="icon" />
          </div>

          <div class="input-box">
            <select v-model="selectedRole" required>
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>

          <q-btn type="submit" color="indigo" label="Login" class="full-width" />

          <p>
            Don’t have an account?
            <a href="#" @click="toggleView($event, false)">Register</a>
          </p>

          <p>Or login with</p>
          <div class="social-icons">
            <q-btn round color="red" icon="mdi-google" size="10px" />
            <q-btn round color="blue-8" icon="mdi-facebook" size="10px" />
            <q-btn round color="black" icon="mdi-github" size="10px" />
            <q-btn round color="blue-9" icon="mdi-linkedin" size="10px" />
          </div>
        </q-form>
      </div>

      <div class="form-box register" :class="{ active: !isLogin }">
        <q-form @submit.prevent="handleRegister">
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
            <input v-model="username" type="text" placeholder="Username" required />
            <q-icon name="mdi-account" class="icon" />
          </div>

          <div class="input-box">
            <input v-model="email" type="email" placeholder="Email" required />
            <q-icon name="mdi-email" class="icon" />
          </div>

          <div class="input-box">
            <input v-model="password" type="password" placeholder="Password" required />
            <q-icon name="mdi-lock" class="icon" />
          </div>

          <div class="input-box">
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Retype Password"
              :class="{ 'input-error': passwordError }"
              required
            />
            <q-icon name="mdi-lock-reset" class="icon" />
          </div>

          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

          <div class="input-box">
            <select v-model="selectedRole" required>
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <q-btn type="submit" color="indigo" label="Register" class="full-width" />

          <p>
            Already have an account?
            <a href="#" @click="toggleView($event, true)">Login</a>
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { QBtn, QForm, QIcon } from 'quasar';
import logo from '../assets/logo.png';

export default defineComponent({
  name: 'LoginRegister',
  components: {
    QBtn,
    QForm,
    QIcon,
  },
  setup() {
    const router = useRouter();

    const isLogin = ref(true);
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const selectedRole = ref('');
    const passwordError = ref('');

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');

    const toggleView = (e: Event, showLogin: boolean) => {
      e.preventDefault();
      isLogin.value = showLogin;
    };

    const handleLogin = () => {
      console.log('Login clicked', username.value, password.value, selectedRole.value);

      if (!selectedRole.value) {
        alert('Please select a role.');
        return;
      }

      if (selectedRole.value === 'student') {
        void router.push('/student-dashboard');
      } else if (selectedRole.value === 'officer') {
        void router.push('/officer-dashboard');
      } else if (selectedRole.value === 'admin') {
        void router.push('/admin-dashboard');
      }
    };

    const handleRegister = () => {
      console.log(
        'Register clicked',
        username.value,
        password.value,
        confirmPassword.value,
        selectedRole.value,
      );

      if (password.value !== confirmPassword.value) {
        passwordError.value = 'Passwords do not match';
        return;
      }

      if (!selectedRole.value) {
        alert('Please select a role.');
        return;
      }

      if (selectedRole.value === 'student') {
        void router.push('/student-dashboard');
      } else if (selectedRole.value === 'officer') {
        void router.push('/officer-dashboard');
      } else if (selectedRole.value === 'admin') {
        void router.push('/admin-dashboard');
      }
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
      isLogin,
      username,
      password,
      confirmPassword,
      selectedRole,
      passwordError,
      firstName,
      lastName,
      email,
      toggleView,
      handleLogin,
      handleRegister,
    };
  },
});
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
