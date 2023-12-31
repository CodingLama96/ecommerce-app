<template>
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">Edit Product</h2>
  
      <form @submit.prevent="updateProduct">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
          <input v-model="product.name" type="text" id="name" name="name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Product Description:</label>
          <textarea v-model="product.description" id="description" name="description" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" rows="4" required></textarea>
        </div>
  
        <div class="mb-4">
          <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Product Price:</label>
          <input v-model="product.price" type="number" id="price" name="price" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required>
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: {
          id: null,
          name: '',
          description: '',
          price: null,
        },
      };
    },
    async mounted() {
      // Fetch the product details when the component is mounted
      await this.fetchProductDetails();
    },
    methods: {
      async fetchProductDetails() {
        try {
          // Retrieve the product details using the ID from the route params
          const productId = this.$route.params.id;
          const response = await axios.get(`/products/${productId}`);
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product details:', error);
          // Handle the error, show a message to the user, etc.
        }
      },
      async updateProduct() {
        try {
          // Make a PUT request to update the product
          await axios.put(`/products/${this.product.id}`, {
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
          });
  
          // Optionally, you can navigate to the product list page after updating
          this.$router.push('/productList');
        } catch (error) {
          console.error('Error updating product:', error);
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
  