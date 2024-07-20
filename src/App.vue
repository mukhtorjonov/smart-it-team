<script setup>
import {RouterView} from "vue-router";
import Navber from './components/navbar.vue'

</script>

<template>
    <Navber v-if="$route.name !='login'"/>
  <RouterView/>
</template>