<script setup>
import Card from 'primevue/card';

const props = defineProps({
  label: String,
  value: String,
  unit: String
});
</script>

<template>
  <Card class="graph-card">
    <template #content>
      <div class="p-text-center">
        <div class="value">{{ value }} {{ unit }}</div>
        <div class="label">{{ label }}</div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.graph-card {
  width: 100%;
  max-width: 280px;
  text-align: center;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.graph-card .value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.graph-card .label {
  font-size: 1.2rem;
  color: var(--text-dark);
}
</style>
