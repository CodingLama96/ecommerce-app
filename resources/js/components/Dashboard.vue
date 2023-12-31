<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-blue-500 p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <span class="text-2xl font-semibold">Dashboard</span>
        <div class="relative" @click="toggleDropdown">
          <button class="text-white">{{ currentUser.name }}</button>
          <div
            v-show="isDropdownOpen"
            class="absolute top-10 right-0 bg-white shadow-md p-2 rounded-lg"
          >
            <button @click="profile" class="block px-4 py-2 text-red-500 hover:bg-gray-100">Profile</button>
            <button @click="logout" class="block px-4 py-2 text-red-500 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Welcome to Your Dashboard, {{ currentUser.name }}!</h2>

      <!-- Add button to go to the product list -->
      <router-link to="/productList">
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Go to Product List</button>
      </router-link>

      <!-- Your dashboard content goes here -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      isDropdownOpen: false,
      currentUser: {},
    };
  },
  mounted() {
    // Fetch user data after the component is mounted
    this.fetchUserData();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    profile() {
      this.$router.push('/profile');
    },
    logout() {
      this.$router.push('/welcome');
    },
    fetchUserData() {
      axios.get('/user')
        .then(response => {
          // Set the retrieved user data to the currentUser property
          this.currentUser = response.data.user;
          console.log(this.currentUser);
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    },
  },
};
</script>
