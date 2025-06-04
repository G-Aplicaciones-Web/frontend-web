<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  company: {
    type: Object,
    default: () => ({ name: '', email: '', planId: null })
  },
  plans: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:visible', 'save']);
const { t } = useI18n();

const dialogVisible = ref(props.visible);
const newCompany = ref({});
const errors = ref({});

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal) {
    newCompany.value = { ...props.company };
    errors.value = {};
  }
});

watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!newCompany.value.name) {
    errors.value.name = t('companies.name_required');
    isValid = false;
  }
  if (!newCompany.value.email) {
    errors.value.email = t('companies.email_required');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCompany.value.email)) {
    errors.value.email = t('companies.email_invalid');
    isValid = false;
  }
  if (!newCompany.value.planId) {
    errors.value.planId = t('companies.plan_required');
    isValid = false;
  }

  return isValid;
};

const saveCompany = () => {
  if (validateForm()) {
    emit('save', { ...newCompany.value });
    dialogVisible.value = false;
  }
};

const cancel = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <Dialog
      :visible="dialogVisible"
      :header="props.company && props.company.id ? t('companies.edit_company') : t('companies.add_new_company')"
      modal
      @update:visible="dialogVisible = $event"
      :breakpoints="{'960px': '75vw', '640px': '90vw'}"
      :style="{width: '40vw'}"
      class="company-form-modal"
  >
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="companyName">{{ t('companies.company_name') }}</label>
        <InputText id="companyName" v-model="newCompany.name" :class="{'p-invalid': errors.name}" />
        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="p-field p-col-12">
        <label for="email">{{ t('companies.email') }}</label>
        <InputText id="email" v-model="newCompany.email" :class="{'p-invalid': errors.email}" />
        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
      </div>
      <div class="p-field p-col-12">
        <label for="plan">{{ t('companies.plan') }}</label>
        <Dropdown
            id="plan"
            v-model="newCompany.planId"
            :options="plans"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('Select a Plan')"
            :class="{'p-invalid': errors.planId}"
        />
        <small class="p-error" v-if="errors.planId">{{ errors.planId }}</small>
      </div>
    </div>
    <template #footer>
      <Button :label="t('companies.cancel')" icon="pi pi-times" class="p-button-danger" @click="cancel" />
      <Button :label="t('companies.save')" icon="pi pi-check" class="p-button-primary" @click="saveCompany" />
    </template>
  </Dialog>
</template>

<style scoped>
.p-fluid .p-field {
  margin-bottom: 1.5rem;
}
.p-error {
  margin-top: 0.25rem;
  display: block;
}
</style>
