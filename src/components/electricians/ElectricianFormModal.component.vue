<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  electrician: {
    type: Object,
    default: () => ({ name: '', lastName: '', code: '', email: '' })
  }
});

const emit = defineEmits(['update:visible', 'save']);
const { t } = useI18n();

const dialogVisible = ref(props.visible);
const newElectrician = ref({});
const errors = ref({});

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal) {
    newElectrician.value = { ...props.electrician };
    errors.value = {};
  }
});

watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!newElectrician.value.name) {
    errors.value.name = t('electricians.first_name_required');
    isValid = false;
  }
  if (!newElectrician.value.lastName) {
    errors.value.lastName = t('electricians.last_name_required');
    isValid = false;
  }
  if (!newElectrician.value.code) {
    errors.value.code = t('electricians.code_required');
    isValid = false;
  }
  if (!newElectrician.value.email) {
    errors.value.email = t('electricians.email_required');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newElectrician.value.email)) {
    errors.value.email = t('electricians.email_invalid');
    isValid = false;
  }

  return isValid;
};

const saveElectrician = () => {
  if (validateForm()) {
    emit('save', { ...newElectrician.value });
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
      :header="props.electrician && props.electrician.id ? t('electricians.edit_electrician') : t('electricians.add_new_electrician')"
      modal
      @update:visible="dialogVisible = $event"
      :breakpoints="{'960px': '75vw', '640px': '90vw'}"
      :style="{width: '40vw'}"
      class="electrician-form-modal"
  >
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="firstName">{{ t('electricians.first_name') }}</label>
        <InputText id="firstName" v-model="newElectrician.name" :class="{'p-invalid': errors.name}" />
        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="lastName">{{ t('electricians.last_name') }}</label>
        <InputText id="lastName" v-model="newElectrician.lastName" :class="{'p-invalid': errors.lastName}" />
        <small class="p-error" v-if="errors.lastName">{{ errors.lastName }}</small>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="code">{{ t('electricians.code') }}</label>
        <InputText id="code" v-model="newElectrician.code" :class="{'p-invalid': errors.code}" />
        <small class="p-error" v-if="errors.code">{{ errors.code }}</small>
      </div>
      <div class="p-field p-col-12 p-md-6">
        <label for="email">{{ t('electricians.email') }}</label>
        <InputText id="email" v-model="newElectrician.email" :class="{'p-invalid': errors.email}" />
        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
      </div>
    </div>
    <template #footer>
      <Button :label="t('electricians.cancel')" icon="pi pi-times" class="p-button-danger" @click="cancel" />
      <Button :label="t('electricians.save')" icon="pi pi-check" class="p-button-primary" @click="saveElectrician" />
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
