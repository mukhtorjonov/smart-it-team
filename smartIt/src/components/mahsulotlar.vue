<template>
  <div class="py-8 bg-white my-16 mx-48 px-28 shadow-lg rounded-xl">
    <div class="flex justify-between items-center py-8">
      <h2 class="text-3xl font-bold text-blue-600">Barcha Mahsulotlar</h2>
      <div class="relative">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-3"></i>
        <input v-model="searchQuery" class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Search...">
      </div>
      <div>
        <router-link :to="{ name: 'mahsulotQoshish' }">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Mahsulot Qo'shish
          </button>
        </router-link>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-white p-4 rounded-3xl border border-slate-100 transition transform hover:-translate-y-2 hover:shadow-xl">
          <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover rounded-t-lg">
          <h2 class="text-xl font-bold mt-4 text-purple-700">{{ product.name }}</h2>
          <p class="text-gray-600 mt-2">{{ product.description }}</p>
          <p class="text-gray-800 font-bold mt-2">Price: {{ product.price }} UZS</p>
          <div class="flex justify-between py-4">
            <router-link :to="{ name: 'mahsulotEdit', params: { id: product.id } }">
              <span class="text-sky-500 font-bold"><i class="fa-solid fa-pencil" style="padding-right: 6px"></i>Edit</span>
            </router-link>
            <span class="text-red-500 font-bold cursor-pointer" @click="deleteProduct(product.id)"><i class="fa-solid fa-trash" style="padding-right: 6px"></i>Delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from './apiClient';

export default {
  data() {
    return {
      products: [],
      searchQuery: '' // Added searchQuery to data
    };
  },
  computed: {
    filteredProducts() {
      // Computed property to filter products based on searchQuery
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  async mounted() {
    try {
      const response = await apiClient.get('/products');
      this.products = response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  methods: {
    async deleteProduct(id) {
      try {
        await apiClient.delete(`/products/${id}`);
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
