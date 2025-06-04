<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import api from '../services/api';
import Button from 'primevue/button';
import CompanyCard from '../components/companies/CompanyCard.component.vue';
import CompanyFormModal from '../components/companies/CompanyFormModal.component.vue';
import ConfirmationModal from '../components/common/ConfirmationModal.component.vue';

const { t } = useI18n();
const toast = useToast();

const companies = ref([]);
const plans = ref([]);
const displayAddEditModal = ref(false);
const displayConfirmDeleteModal = ref(false);
const selectedCompany = ref(null);
const companyToDeleteId = ref(null);

const fetchCompanies = async () => {
  try {
    const response = await api.get('/companies');
    companies.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('companies.fetch_error') + error.message,
      life: 3000
    });
    console.error(t('companies.fetch_error'), error);
  }
};

const fetchPlans = async () => {
  try {
    const response = await api.get('/plans');
    plans.value = response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
  }
};

const handleSaveCompany = async (companyData) => {
  try {
    if (companyData.id) {
      await api.put(`/companies/${companyData.id}`, companyData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('companies.company_updated_success'),
        life: 3000
      });
    } else {
      await api.post('/companies', companyData);
      toast.add({
        severity: 'success',
        summary: t('global_messages.success'),
        detail: t('companies.company_added_success'),
        life: 3000
      });
    }
    displayAddEditModal.value = false;
    await fetchCompanies();
  } catch (error) {
    const errorMessage = companyData.id ? t('companies.update_error') : t('companies.add_error');
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: errorMessage + error.message,
      life: 3000
    });
    console.error(errorMessage, error);
  }
};

const handleDeleteCompany = async () => {
  try {
    await api.delete(`/companies/${companyToDeleteId.value}`);
    toast.add({
      severity: 'success',
      summary: t('global_messages.success'),
      detail: t('companies.company_deleted_success'),
      life: 3000
    });
    displayConfirmDeleteModal.value = false;
    await fetchCompanies();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('companies.delete_error') + error.message,
      life: 3000
    });
    console.error(t('companies.delete_error'), error);
  }
};

const openAddModal = () => {
  selectedCompany.value = { name: '', email: '', planId: null };
  displayAddEditModal.value = true;
};

const openEditModal = (company) => {
  selectedCompany.value = { ...company };
  displayAddEditModal.value = true;
};

const openConfirmDelete = (id) => {
  companyToDeleteId.value = id;
  displayConfirmDeleteModal.value = true;
};

const cancelDelete = () => {
  companyToDeleteId.value = null;
  displayConfirmDeleteModal.value = false;
};

onMounted(() => {
  fetchCompanies();
  fetchPlans();
});
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-d-flex p-jc-between p-ai-center p-mb-4">
      <h1>{{ t('companies.title') }}</h1>
      <Button :label="t('companies.add_company')" icon="pi pi-plus" class="p-button-primary" @click="openAddModal" />
    </div>

    <div class="p-grid p-grid-column">
      <CompanyCard
          v-for="company in companies"
          :key="company.id"
          :company="company"
          :plans="plans"
          @edit="openEditModal"
          @delete="openConfirmDelete"
      />
      <div v-if="companies.length === 0" class="p-col-12 p-text-center p-text-secondary">
        {{ t('No companies to display.') }} </div>
    </div>

    <CompanyFormModal
        :visible="displayAddEditModal"
        :company="selectedCompany"
        :plans="plans"
        @update:visible="displayAddEditModal = $event"
        @save="handleSaveCompany"
    />

    <ConfirmationModal
        :visible="displayConfirmDeleteModal"
        :message="t('modal.delete_confirmation_message')"
        :header="t('modal.delete_confirmation_title')"
        @update:visible="displayConfirmDeleteModal = $event"
        @confirm="handleDeleteCompany"
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
