<template>
  <div class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-4xl font-bold mb-8">Product List</h2>
    <router-link to="/dashboard">
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Go back to dashboard</button>
    </router-link>
    <div class="flex justify-between items-center mb-4">
      <!-- Search input -->
      <input v-model="searchQuery" type="text" class="p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Search products">
      <router-link to="/add-product" class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green">Add Product</router-link>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full table-auto bg-white border border-gray-200">
        <!-- Table header -->
        <thead>
          <tr>
            <th class="py-3 px-6 text-left bg-gray-100 border-b">ID</th>
            <th class="py-3 px-6 text-left bg-gray-100 border-b">Name</th>
            <th class="py-3 px-6 text-left bg-gray-100 border-b">Price</th>
            <th class="py-3 px-6 text-left bg-gray-100 border-b">Actions</th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
            <td class="py-2 px-6 border-b">{{ product.id }}</td>
            <td class="py-2 px-6 border-b">{{ product.name }}</td>
            <td class="py-2 px-6 border-b">{{ product.price }}</td>
            <td class="py-2 px-6 border-b">
              <!-- Edit Product link -->
              <router-link :to="{ name: 'EditProduct', params: { id: product.id } }" class="text-blue-500 hover:underline mr-2">Edit</router-link>
              <!-- Delete Product button -->
              <button @click="confirmDelete(product.id)" class="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Confirm Delete Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-md w-1/3">
        <p class="text-lg font-semibold mb-4">Confirm Deletion</p>
        <p class="text-gray-700 mb-4">Are you sure you want to delete this product?</p>
        <div class="flex justify-end">
          <button @click="cancelDelete" class="text-gray-600 hover:underline mr-4">Cancel</button>
          <button @click="deleteProduct" class="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      showConfirmModal: false,
      productIdToDelete: null,
      searchQuery: '', // Added search query property
    };
  },
  async mounted() {
    // Fetch products when the component is mounted
    await this.fetchProducts();
  },
  computed: {
    // Computed property to filter products based on the search query
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
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
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating product:', error);
        // Handle the error, show a message to the user, etc.
      }
    },
    confirmDelete(id) {
      this.productIdToDelete = id;
      this.showConfirmModal = true;
    },
    cancelDelete() {
      this.showConfirmModal = false;
      this.productIdToDelete = null;
    },
    async deleteProduct() {
      if (this.productIdToDelete) {
        try {
          await axios.delete(`/products/${this.productIdToDelete}`);
          // Filter out the deleted product from the array
          this.products = this.products.filter(product => product.id !== this.productIdToDelete);
        } catch (error) {
          console.error('Error deleting product:', error);
        } finally {
          // Reset values after deletion
          this.showConfirmModal = false;
          this.productIdToDelete = null;
        }
      }
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles here */
/* Feel free to customize further based on your design preferences */
</style>
