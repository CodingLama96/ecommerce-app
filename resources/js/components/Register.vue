<!-- RegisterComponent.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="register" class="bg-white p-8 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-6">Register</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input v-model="name" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input v-model="email" type="email" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input v-model="password" type="password" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
        <input v-model="password_confirmation" type="password" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
        Register
      </button>
      <router-link to="/login" class="block text-center text-blue-500 mt-4 hover:underline">Already have an account? Login</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    async register() {
      try {
        // Check if passwords match
        if (this.password !== this.password_confirmation) {
          console.error('Password and Confirm Password do not match');
          // Handle password mismatch, show error message, etc.
          return;
        }

        // Make API request to register endpoint using Axios
        
        const response= await axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation : this.password_confirmation
          });
  
        // Handle successful registration, e.g., redirect to login page
        console.log('Registration successful:', response.data);

        // Redirect to login page after successful registration
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration failure, show error message, etc.
      }
    },
  },
};
</script>
