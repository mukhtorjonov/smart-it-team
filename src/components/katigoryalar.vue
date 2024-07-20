<template>
  <div class="py-8 bg-white my-16 mx-48 px-28 shadow-lg rounded-xl">
    <div class="flex justify-between items-center py-8">
      <h2 class="text-3xl font-bold text-blue-500">Barcha Kategoriyalar</h2>
      <div class="relative">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-3"></i>
        <input
          v-model="searchQuery"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div>
        <router-link :to="{ name: 'katigoriyaQoshish' }">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Kategoriya Qo'shish
          </button>
        </router-link>
      </div>
    </div>
    <div class="max-w-7xl mx-auto grid grid-cols-4">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="relative bg-white border border-state-100 w-72 rounded-3xl p-8 m-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
      >
        <div class="flex flex-col">
          <img :src="category.image" :alt="category.name" class="w-full h-40 object-cover rounded-t-lg">
          <div class="describe mt-5">
            <div class="text">
              <h1 class="font-bold uppercase text-gray-700">
                <router-link :to="{ name: 'mahsulotlar' }">{{ category.name }}</router-link>
              </h1>
              <div class="description">
                <p id="description" class="text-gray-600 text-md py-2">{{ category.description ?? 'No description available' }}</p>
              </div>
            </div>
            <div class="button flex justify-between py-4">
              <router-link :to="{ name: 'katigoriyaEdit', params: { id: category.id } }">
                <span @click="updateCategory(category.id)" class="text-sky-500 font-bold">
                  <i class="fa-solid fa-pencil" style="padding-right: 6px"></i>Edit
                </span>
              </router-link>
              <span @click="deleteCategory(category.id)" class="text-red-500 font-bold cursor-pointer">
                <i class="fa-solid fa-trash" style="padding-right: 6px"></i>Delete
              </span>
            </div>
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
      categories: [],
      searchQuery: '' // Added searchQuery to data
    };
  },
  computed: {
    filteredCategories() {
      // Computed property to filter categories based on searchQuery
      return this.categories.filter(category => {
        return category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  async mounted() {
    try {
      const response = await apiClient.get('/categories');
      this.categories = response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  methods: {
    async deleteCategory(id) {
      try {
        await apiClient.delete(`/categories/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    },
    async updateCategory(id) {
      try {
        const response = await apiClient.get(`/categories/${id}`);
        const updatedCategory = response.data.data;
        this.categories = this.categories.map(category =>
          category.id === id ? updatedCategory : category
        );
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  }
};
</script>

<style scoped>
.description {
  height: 60px;
  overflow-y: auto; 
  scrollbar-width: none; 
  -ms-overflow-style: none;
}

.description::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}
</style>


