<template>
    <section class="log-in flex justify-center min-h-52 items-center py-52">
      <form @submit.prevent="login" method="post" class="bg-white shadow-xl border-black rounded-md p-8 w-96">
        <h3 class="text-center text-4xl mb-4 text-gray-700">Welcome back!</h3>
        <p class="pt-4 pb-2 text-lg text-gray-600">Enter your email</p>
        <input type="email" v-model="email" placeholder="Enter your email" maxlength="100" required class="box w-full border-none rounded-md my-1 mx-0 p-3 bg-[#eee]">
        <p class="pt-4 pb-2 text-lg text-gray-600">Enter your password</p>
        <input type="password" v-model="password" placeholder="Enter your password" maxlength="50" required class="box w-full border-none rounded-md my-1 mx-0 p-3 bg-[#eee]">
        <div class="flex items-center pt-5">
          <input id="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600">
          <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        <div class="pt-6">
          <button type="submit" class="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 cursor-pointer rounded-md transition duration-200 transform hover:scale-105 active:border-t-4 active:border-b-0 w-full flex justify-center">Login</button>
        </div>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      </form>
    </section>
  </template>
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

const apiClient = axios.create({
  baseURL: 'https://b2ba-213-230-116-198.ngrok-free.app/api',  
  headers: {
    'ngrok-skip-browser-warning': 'true',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});
export default {
  data() {
      return {
          email: '',
          password: '',
          error: ''
      };
  },
  setup() {
      const router = useRouter();
      return { router };
  },
  methods: {
      async login() {
          console.log('Email:', this.email);
          console.log('Password:', this.password);
        try {
              const response = await apiClient.post('/auth/login', {
                  email: this.email,
                  password: this.password
              });
            console.log('Успешный вход:', response.data);
              localStorage.setItem('authToken', response.data.token);
              axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
              this.router.push('/katigoriya');
          } catch (error) {
              console.error('Ошибка входа:', error);
              this.error = 'Ошибка входа. Пожалуйста, проверьте ваши имя пользователя и пароль.';
          }
      }
  }
}; 
</script>