<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import api from '../services/api';
import Button from 'primevue/button';
import DeviceCard from '../components/devices/DeviceCard.component.vue';
import DeviceFormModal from '../components/devices/DeviceFormModal.component.vue';
import ConfirmationModal from '../components/common/ConfirmationModal.component.vue';

const { t } = useI18n();
const toast = useToast();

const devices = ref([]);
const displayAddEditModal = ref(false);
const displayConfirmDeleteModal = ref(false);
const selectedDevice = ref(null);
const deviceToDeleteId = ref(null);

const connectedDevices = computed(() =>
    devices.value.filter(device => device.status === 'connected')
);
const disconnectedDevices = computed(() =>
    devices.value.filter(device => device.status === 'disconnected')
);

const fetchDevices = async () => {
  try {
    const response = await api.get('/devices');
    devices.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('devices.fetch_error') + error.message,
      life: 3000
    });
    console.error(t('devices.fetch_error'), error);
  }
};

const handleSaveDevice = async (deviceData) => {
  try {
    if (deviceData.id) {
      await api.put(`/devices/${deviceData.id}`, deviceData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('devices.device_updated_success'),
        life: 3000
      });
    } else {
      await api.post('/devices', deviceData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('devices.device_added_success'),
        life: 3000
      });
    }
    displayAddEditModal.value = false;
    await fetchDevices();
  } catch (error) {
    const errorMessage = deviceData.id ? t('devices.update_error') : t('devices.add_error');
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: errorMessage + error.message,
      life: 3000
    });
    console.error(errorMessage, error);
  }
};

const handleDeleteDevice = async () => {
  try {
    await api.delete(`/devices/${deviceToDeleteId.value}`);
    toast.add({
      severity: 'success',
      summary: t('global_messages.success'),
      detail: t('devices.device_deleted_success'),
      life: 3000
    });
    displayConfirmDeleteModal.value = false;
    await fetchDevices();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('devices.delete_error') + error.message,
      life: 3000
    });
    console.error(t('devices.delete_error'), error);
  }
};

const handleConnectDisconnect = async (device, status) => {
  try {
    const updatedDevice = { ...device, status: status };
    await api.put(`/devices/${device.id}`, updatedDevice);
    toast.add({
      severity: 'success',
      summary: t('global_messages.success'),
      detail: status === 'connected' ? t('devices.device_connected_success') : t('devices.device_disconnected_success'),
      life: 3000
    });
    await fetchDevices();
  } catch (error) {
    const errorMessage = status === 'connected' ? t('devices.connect_error') : t('devices.disconnect_error');
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: errorMessage + error.message,
      life: 3000
    });
    console.error(errorMessage, error);
  }
};

const openAddModal = () => {
  selectedDevice.value = { name: '', voltage: null, current: null, power: null, status: 'disconnected' };
  displayAddEditModal.value = true;
};

const openEditModal = (device) => {
  selectedDevice.value = { ...device };
  displayAddEditModal.value = true;
};

const openConfirmDelete = (id) => {
  deviceToDeleteId.value = id;
  displayConfirmDeleteModal.value = true;
};

const cancelDelete = () => {
  deviceToDeleteId.value = null;
  displayConfirmDeleteModal.value = false;
};

onMounted(fetchDevices);
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
      <h1>{{ t('devices.title') }}</h1>
      <Button :label="t('devices.add_device')" icon="pi pi-plus" class="p-button-primary add-new-button" @click="openAddModal" />
    </div>

    <div class="p-grid p-gap-3">
      <div class="p-col-12 p-md-6">
        <h2 class="p-mb-3">{{ t('devices.connected_devices') }}</h2>
        <div v-if="connectedDevices.length === 0" class="p-text-center p-text-secondary">
          {{ t('No connected devices to display.') }}
        </div>
        <div class="p-grid p-grid-column">
          <DeviceCard
              v-for="device in connectedDevices"
              :key="device.id"
              :device="device"
              @edit="openEditModal"
              @delete="openConfirmDelete"
              @connect-disconnect="handleConnectDisconnect"
          />
        </div>
      </div>
      <div class="p-col-12 p-md-6">
        <h2 class="p-mb-3">{{ t('devices.disconnected_devices') }}</h2>
        <div v-if="disconnectedDevices.length === 0" class="p-text-center p-text-secondary">
          {{ t('No disconnected devices to display.') }}
        </div>
        <div class="p-grid p-grid-column">
          <DeviceCard
              v-for="device in disconnectedDevices"
              :key="device.id"
              :device="device"
              @edit="openEditModal"
              @delete="openConfirmDelete"
              @connect-disconnect="handleConnectDisconnect"
          />
        </div>
      </div>
    </div>

    <DeviceFormModal
        :visible="displayAddEditModal"
        :device="selectedDevice"
        @update:visible="displayAddEditModal = $event"
        @save="handleSaveDevice"
    />

    <ConfirmationModal
        :visible="displayConfirmDeleteModal"
        :message="t('modal.delete_confirmation_message')"
        :header="t('modal.delete_confirmation_title')"
        @update:visible="displayConfirmDeleteModal = $event"
        @confirm="handleDeleteDevice"
        @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.p-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.p-d-flex {
  display: flex;
}

.p-jc-between {
  justify-content: space-between;
}

.p-ai-center {
  align-items: center;
}

.p-mb-4 {
  margin-bottom: 2rem;
}

.p-mb-3 {
  margin-bottom: 1.5rem;
}

.p-grid {
  display: grid;
  gap: 1.5rem;
}

.p-grid-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .p-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.p-text-center {
  text-align: center;
}

.p-text-secondary {
  color: var(--text-medium);
}

.add-new-button {
  border-radius: 8px !important; /* Más redondeado */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
</style>
