<script setup>
import { RouterView } from 'vue-router';
import AppToolbar from './components/common/AppToolbar.component.vue';
import Toast from 'primevue/toast';
</script>

<template>
  <div>
    <AppToolbar />
    <Toast position="top-right" />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
