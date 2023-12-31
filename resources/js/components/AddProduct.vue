<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">Add Product</h2>
  
      <form @submit.prevent="addProduct">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
          <input v-model="productName" type="text" id="name" name="name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Product Description:</label>
          <textarea v-model="productDescription" id="description" name="description" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4" required></textarea>
        </div>
  
        <div class="mb-4">
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Product Price:</label>
          <input v-model="productPrice" type="number" id="price" name="price" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productName: '',
        productDescription: '',
        productPrice: null,
      };
    },
    methods: {
      async addProduct() {
        try {
          // Make a POST request to add the product
          await axios.post('/products', {
            name: this.productName,
            description: this.productDescription,
            price: this.productPrice,
          });
  
          // Optionally, you can navigate to the product list page after adding
          this.$router.push('/productList');
        } catch (error) {
          console.error('Error adding product:', error);
          // Handle the error, show a message to the user, etc.
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  /* Feel free to customize further based on your design preferences */
  </style>
  