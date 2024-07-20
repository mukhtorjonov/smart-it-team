<template>
    <div class="container mx-auto p-8 pt-20">
      <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Kategoriya Qo'shish</h2>
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="category_name" class="block text-gray-700 font-bold mb-2">Kategoriya Nomi:</label>
            <input type="text" id="name" v-model="name" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Tavsif:</label>
            <textarea id="description" v-model="description" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" required></textarea>
          </div>
          <div class="mb-6">
            <label for="image" class="block text-gray-700 font-bold mb-2">Rasm yuklash:</label>
            <input type="file" id="image" @change="onFileChange" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <div class="text-center">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from './apiClient';
  
  export default {
    data() {
      return {
        name: '',
        description: '',
        image: null
      };
    },
    methods: {
      onFileChange(e) {
        this.image = e.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('image', this.image);
  
        try {
          await apiClient.post('/categories', formData);
          this.$router.push({ name: 'katigoriya' });
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    }
  };
  </script>
  