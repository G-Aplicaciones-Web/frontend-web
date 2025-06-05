<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import api from '../services/api';
import Button from 'primevue/button';
import ElectricianCard from '../components/electricians/ElectricianCard.component.vue';
import ElectricianFormModal from '../components/electricians/ElectricianFormModal.component.vue';
import ConfirmationModal from '../components/common/ConfirmationModal.component.vue';

const { t } = useI18n();
const toast = useToast();

const electricians = ref([]);
const displayAddEditModal = ref(false);
const displayConfirmDeleteModal = ref(false);
const selectedElectrician = ref(null); // Para editar o eliminar
const electricianToDeleteId = ref(null);

const fetchElectricians = async () => {
  try {
    const response = await api.get('/electricians');
    electricians.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('electricians.fetch_error') + error.message,
      life: 3000
    });
    console.error(t('electricians.fetch_error'), error);
  }
};

const handleSaveElectrician = async (electricianData) => {
  try {
    if (electricianData.id) {
      await api.put(`/electricians/${electricianData.id}`, electricianData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('electricians.electrician_updated_success'),
        life: 3000
      });
    } else {
      await api.post('/electricians', electricianData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('electricians.electrician_added_success'),
        life: 3000
      });
    }
    displayAddEditModal.value = false;
    await fetchElectricians();
  } catch (error) {
    const errorMessage = electricianData.id ? t('electricians.update_error') : t('electricians.add_error');
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: errorMessage + error.message,
      life: 3000
    });
    console.error(errorMessage, error);
  }
};

const handleDeleteElectrician = async () => {
  try {
    await api.delete(`/electricians/${electricianToDeleteId.value}`);
    toast.add({
      severity: 'success',
      summary: t('global_messages.success'),
      detail: t('electricians.electrician_deleted_success'),
      life: 3000
    });
    displayConfirmDeleteModal.value = false;
    await fetchElectricians();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('electricians.delete_error') + error.message,
      life: 3000
    });
    console.error(t('electricians.delete_error'), error);
  }
};

const openAddModal = () => {
  selectedElectrician.value = { name: '', lastName: '', code: '', email: '' };
  displayAddEditModal.value = true;
};

const openEditModal = (electrician) => {
  selectedElectrician.value = { ...electrician };
  displayAddEditModal.value = true;
};

const openConfirmDelete = (id) => {
  electricianToDeleteId.value = id;
  displayConfirmDeleteModal.value = true;
};

const cancelDelete = () => {
  electricianToDeleteId.value = null;
  displayConfirmDeleteModal.value = false;
};

onMounted(fetchElectricians);
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
      <h1>{{ t('electricians.title') }}</h1>
      <Button :label="t('electricians.add_electrician')" icon="pi pi-plus" class="p-button-primary" @click="openAddModal" />
    </div>

    <div class="p-grid p-grid-column">
      <ElectricianCard
          v-for="electrician in electricians"
          :key="electrician.id"
          :electrician="electrician"
          @edit="openEditModal"
          @delete="openConfirmDelete"
      />
      <div v-if="electricians.length === 0" class="p-col-12 p-text-center p-text-secondary">
        {{ t('No electricians to display.') }} </div>
    </div>

    <ElectricianFormModal
        :visible="displayAddEditModal"
        :electrician="selectedElectrician"
        @update:visible="displayAddEditModal = $event"
        @save="handleSaveElectrician"
    />

    <ConfirmationModal
        :visible="displayConfirmDeleteModal"
        :message="t('modal.delete_confirmation_message')"
        :header="t('modal.delete_confirmation_title')"
        @update:visible="displayConfirmDeleteModal = $event"
        @confirm="handleDeleteElectrician"
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

.p-grid-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.p-text-center {
  text-align: center;
}

.p-text-secondary {
  color: var(--text-medium);
}
</style>
