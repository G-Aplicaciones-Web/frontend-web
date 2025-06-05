<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['confirm', 'cancel', 'update:visible']);

const dialogVisible = ref(props.visible);
const { t } = useI18n();

watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
});

watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});

const confirm = () => {
  emit('confirm');
  dialogVisible.value = false;
};

const cancel = () => {
  emit('cancel');
  dialogVisible.value = false;
};
</script>

<template>
  <Dialog
      :visible="dialogVisible"
      :header="header || t('modal.delete_confirmation_title')"
      modal
      @update:visible="dialogVisible = $event"
      class="confirmation-modal"
  >
    <div class="p-dialog-content">
      <p>{{ message || t('modal.delete_confirmation_message') }}</p>
    </div>
    <template #footer>
      <Button :label="t('modal.no')" icon="pi pi-times" class="p-button-danger" @click="cancel" />
      <Button :label="t('modal.yes')" icon="pi pi-check" class="p-button-primary" @click="confirm" />
    </template>
  </Dialog>
</template>

<style scoped>
.p-dialog-content {
  background-color: var(--bg-white);
}
</style>
