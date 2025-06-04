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
  device: {
    type: Object,
    default: () => ({ name: '', voltage: null, current: null, power: null, status: 'disconnected' })
  }
});

const emit = defineEmits(['update:visible', 'save']);
const { t } = useI18n();

const dialogVisible = ref(props.visible);
const newDevice = ref({});
const errors = ref({});

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal) {
    newDevice.value = { ...props.device };
    errors.value = {};
  }
});

watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!newDevice.value.name) {
    errors.value.name = t('devices.name_required');
    isValid = false;
  }
  if (newDevice.value.voltage === null || newDevice.value.voltage === '' || isNaN(newDevice.value.voltage)) {
    errors.value.voltage = t('devices.voltage_required');
    isValid = false;
  } else if (parseFloat(newDevice.value.voltage) <= 0) {
    errors.value.voltage = t('devices.positive_number');
    isValid = false;
  }
  if (newDevice.value.current === null || newDevice.value.current === '' || isNaN(newDevice.value.current)) {
    errors.value.current = t('devices.current_required');
    isValid = false;
  } else if (parseFloat(newDevice.value.current) <= 0) {
    errors.value.current = t('devices.positive_number');
    isValid = false;
  }
  if (newDevice.value.power === null || newDevice.value.power === '' || isNaN(newDevice.value.power)) {
    errors.value.power = t('devices.power_required');
    isValid = false;
  } else if (parseFloat(newDevice.value.power) <= 0) {
    errors.value.power = t('devices.positive_number');
    isValid = false;
  }

  return isValid;
};

const saveDevice = () => {
  if (validateForm()) {
    emit('save', { ...newDevice.value });
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
      :header="props.device && props.device.id ? t('devices.edit_device') : t('devices.add_new_device')"
      modal
      @update:visible="dialogVisible = $event"
      :breakpoints="{'960px': '75vw', '640px': '90vw'}"
      :style="{width: '40vw'}"
      class="device-form-modal"
  >
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12">
        <label for="name">{{ t('devices.device_name') }}</label>
        <InputText id="name" v-model="newDevice.name" :class="{'p-invalid': errors.name}" />
        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <label for="voltage">{{ t('devices.voltage') }}</label>
        <InputText id="voltage" v-model.number="newDevice.voltage" type="number" :class="{'p-invalid': errors.voltage}" />
        <small class="p-error" v-if="errors.voltage">{{ errors.voltage }}</small>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <label for="current">{{ t('devices.current') }}</label>
        <InputText id="current" v-model.number="newDevice.current" type="number" :class="{'p-invalid': errors.current}" />
        <small class="p-error" v-if="errors.current">{{ errors.current }}</small>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <label for="power">{{ t('devices.power') }}</label>
        <InputText id="power" v-model.number="newDevice.power" type="number" :class="{'p-invalid': errors.power}" />
        <small class="p-error" v-if="errors.power">{{ errors.power }}</small>
      </div>
    </div>
    <template #footer>
      <Button :label="t('devices.cancel')" icon="pi pi-times" class="p-button-danger" @click="cancel" />
      <Button :label="t('devices.save')" icon="pi pi-check" class="p-button-primary" @click="saveDevice" />
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
