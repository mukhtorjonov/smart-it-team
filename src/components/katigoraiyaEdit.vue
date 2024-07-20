<template>
    <div class="max-w-4xl mx-auto mt-16 p-10 bg-white rounded-xl shadow-2xl">
    <h2 class="text-4xl font-bold text-gray-800 mb-8">Kategoryiani O'zgartirish</h2>
    <form @submit.prevent="submitForm"  enctype="multipart/form-data">
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div class="mb-4 sm:col-span-2">
                <label for="category_name" class="block text-gray-700 font-bold mb-2">Kategoriya Nomi:</label>
                <input type="text" id="category_name" name="category_name" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" required>
            </div>

            <div class="sm:col-span-2">
                <label for="category-description" class="block text-lg font-semibold text-gray-700">Izoh</label>
                <textarea id="category-description" name="category-description" rows="3" class="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"></textarea>
            </div>
            <div class="sm:col-span-2">
                <label for="category-image" class="block text-lg font-semibold text-gray-700">Rasmni yuklang</label>
                <input type="file" id="category-image" name="category-image" class="mt-2 block w-full text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
        </div>

        <div class="text-center pt-6">
            <button type="submit" class="bg-blue-600 text-white px-4 py-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">O'zgarishlarni Saqlash</button>
        </div>

    </form>
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
          await apiClient.put(`/categoriesEdit/${id}`, formData);
          this.$router.push({ name: 'katigoriya' });
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    }
  };
  </script>
