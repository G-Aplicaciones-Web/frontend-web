<script setup>
import Card from 'primevue/card';

const props = defineProps({
  image: String,
  title: String,
  text: String
});
</script>

<template>
  <Card class="suggestion-card">
    <template #content>
      <div class="p-text-center">
        <img :src="`/images/${image}`" :alt="title" class="suggestion-image" />
        <h3 class="suggestion-title">{{ title }}</h3>
        <p class="suggestion-text">{{ text }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.suggestion-card {
  width: 100%;
  max-width: 280px;
  text-align: center;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.suggestion-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.suggestion-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.suggestion-text {
  font-size: 0.9rem;
  color: var(--text-medium);
  line-height: 1.5;
}
</style>
