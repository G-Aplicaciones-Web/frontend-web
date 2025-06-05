<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  electrician: Object
});

const emit = defineEmits(['edit', 'delete']);
const { t } = useI18n();
</script>

<template>
  <Card class="electrician-card">
    <template #content>
      <div class="card-header-main">
        <img src="/images/electricistas.png" :alt="t('electricians.title')" class="electrician-image" />
        <div class="electrician-info-flex-grow">
          <div class="electrician-name-display">{{ electrician.name }} {{ electrician.lastName }}</div>
          <div class="electrician-code">{{ t('electricians.code') }}: {{ electrician.code }}</div>
          <div class="electrician-email">{{ electrician.email }}</div>
        </div>
        <div class="card-actions">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-secondary" @click="emit('edit', electrician)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="emit('delete', electrician.id)" />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.electrician-card {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: var(--bg-white);
  padding: 1rem;
}

.card-header-main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.electrician-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
}

.electrician-info-flex-grow {
  flex-grow: 1;
  min-width: 0;
}

.electrician-name-display {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.electrician-code,
.electrician-email {
  font-size: 0.9rem;
  color: var(--text-medium);
  margin-bottom: 0.25rem;
}

.card-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
  align-items: center;
  padding-top: 5px;
}
</style>
