<script setup>
import Card from 'primevue/card';

const props = defineProps({
  step: String,
  title: String,
  text: String,
  stepNumber: Number
});
</script>

<template>
  <Card class="guide-step-card">
    <template #content>
      <div class="p-text-center">
        <div class="step-number">{{ stepNumber }}</div>
        <h3 class="step-title">{{ title }}</h3>
        <p class="step-text">{{ text }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.guide-step-card {
  width: 100%;
  max-width: 350px;
  text-align: center;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.step-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
}

.step-text {
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
}
</style>
