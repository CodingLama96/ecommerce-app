<!-- LoginComponent.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input v-model="email" type="email" class="w-full p-2 border border-gray-300 rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input v-model="password" type="password" class="w-full p-2 border border-gray-300 rounded" required>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
          Login
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: null, // Add an error variable to handle login errors
    };
  },
  methods: {
    async login() {
 try {
        const response= await axios.post('/login', {
          email: this.email,
          password: this.password
          });
  
        console.log('Login successful:', response.data);
        this.$router.push('/dashboard');
        // Redirect to a different route or perform other actions
      } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);

        // Set the loginError variable to display the error to the user
        this.loginError = 'Invalid credentials. Please try again.';
      }
    },
  },
};
</script>
