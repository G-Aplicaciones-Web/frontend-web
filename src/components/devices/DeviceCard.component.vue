<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  device: Object
});

const emit = defineEmits(['edit', 'delete', 'connect-disconnect']);
const { t } = useI18n();

const getStatusColor = (status) => {
  return status === 'connected' ? 'color: var(--primary-color); font-weight: bold;' : 'color: var(--danger-color);';
};

const getStatusLabel = (status) => {
  return status === 'connected' ? t('devices.connected') : t('devices.disconnected');
};
</script>

<template>
  <Card class="device-card">
    <template #content>
      <div class="card-header">
        <i class="pi pi-cog device-icon" style="font-size: 2rem; color: var(--text-dark);"></i>
        <div class="device-name">{{ device.name }}</div>
        <div class="card-actions">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-secondary" @click="emit('edit', device)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="emit('delete', device.id)" />
        </div>
      </div>
      <div class="card-body">
        <div class="device-detail">
          <strong>{{ t('devices.voltage') }}:</strong> {{ device.voltage }} V
        </div>
        <div class="device-detail">
          <strong>{{ t('devices.current') }}:</strong> {{ device.current }} A
        </div>
        <div class="device-detail">
          <strong>{{ t('devices.power') }}:</strong> {{ device.power }} W
        </div>
        <div class="device-detail">
          <strong>{{ t('Status') }}:</strong> <span :style="getStatusColor(device.status)">{{ getStatusLabel(device.status) }}</span>
        </div>
      </div>
      <div class="card-footer">
        <Button
            :label="device.status === 'connected' ? t('devices.disconnect') : t('devices.connect')"
            :icon="device.status === 'connected' ? 'pi pi-power-off' : 'pi pi-wifi'"
            :class="['p-button-sm', device.status === 'connected' ? 'p-button-danger' : 'p-button-primary', 'action-button']"
            @click="emit('connect-disconnect', device, device.status === 'connected' ? 'disconnected' : 'connected')"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.device-card {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: var(--bg-white);
  padding: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.device-icon {
  margin-right: 0.5rem;
}

.device-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-dark);
  flex-grow: 1;
}

.card-actions {
  display: flex;
  gap: 0.25rem;
}

.card-body {
  margin-bottom: 1rem;
}

.device-detail {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-medium);
}

.device-detail strong {
  color: var(--text-dark);
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  border-radius: 8px !important;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
}

.p-button-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}
</style>
