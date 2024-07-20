<template>
  <div class="max-w-4xl mx-auto mt-16 p-10 bg-white rounded-xl shadow-2xl">
    <div class="bg-white p-10 rounded-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Mahsulotni O'zgartirish</h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label for="MahsulotName" class="block text-gray-700 font-bold mb-2">Mahsulot Nomi:</label>
            <input v-model="product.name" type="text" id="MahsulotName" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div>
            <label for="price" class="block text-gray-700 font-bold mb-2">Narx:</label>
            <input v-model="product.price" type="text" id="price" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
        </div>
        <div class="mb-4">
          <label for="category_id" class="block text-gray-700 font-bold mb-2">Kategoriya:</label>
          <select v-model="product.category_id" id="category_id" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option disabled value="">Kategoriya tanlang</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="mb-6">
          <label for="description" class="block text-gray-700 font-bold mb-2">Izoh:</label>
          <textarea v-model="product.description" id="description" rows="4" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div class="mb-6">
          <label for="imageUpload" class="block text-gray-700 font-bold mb-2">Rasmni yuklang:</label>
          <input @change="onFileChange" type="file" id="imageUpload" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="text-center pt-6">
          <button type="submit" class="bg-blue-600 text-white px-4 py-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">O'zgarishlarni Saqlash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from './apiClient';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        category_id: '',
        description: '',
        image: null
      },
      categories: []
    };
  },
  async mounted() {
    await this.fetchProduct();
    await this.fetchCategories();
  },
  methods: {
    onFileChange(e) {
      this.product.image = e.target.files[0];
    },
    async fetchCategories() {
      try {
        const response = await apiClient.get('/categories');
        this.categories = response.data.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchProduct() {
      try {
        const response = await apiClient.get(`/products/${this.id}`);
        this.product = response.data.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('category_id', this.product.category_id);
      formData.append('description', this.product.description);
      if (this.product.image) {
        formData.append('image', this.product.image);
      }

      try {
        await apiClient.patch(`/products/${this.id}`, formData);
        this.$router.push({ name: 'mahsulotlar' });
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  }
};
</script>
