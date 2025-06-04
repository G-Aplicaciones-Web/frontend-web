<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import LanguageSwitcher from '../../public/components/language-switcher.component.vue'; // Ajustado el nombre del archivo

const router = useRouter();
const { t } = useI18n();

const navigateTo = (name) => {
  router.push({ name: name });
};
</script>

<template>
  <div class="app-toolbar p-menubar p-component">
    <div class="p-menubar-start">
      <h2 class="app-title">EcoVolt</h2>
    </div>
    <div class="p-menubar-root-list">
      <Button :label="t('toolbar.home')" text @click="navigateTo('home')" class="p-button-text p-button-secondary" />
      <Button :label="t('toolbar.devices')" text @click="navigateTo('devices')" class="p-button-text p-button-secondary" />
      <Button :label="t('toolbar.subscriptions')" text @click="navigateTo('subscriptions')" class="p-button-text p-button-secondary" />
      <Button :label="t('toolbar.guides')" text @click="navigateTo('guides')" class="p-button-text p-button-secondary" />
      <Button :label="t('toolbar.companies')" text @click="navigateTo('companies')" class="p-button-text p-button-secondary" />
      <Button :label="t('toolbar.electricians')" text @click="navigateTo('electricians')" class="p-button-text p-button-secondary" />
    </div>
    <div class="p-menubar-end">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<style scoped>
.app-toolbar {
  background-color: var(--primary-color);
  color: var(--bg-white);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.app-title {
  color: var(--bg-white);
  margin: 0;
  font-weight: bold;
}

.p-menubar-root-list {
  display: flex;
  gap: 1rem;
}

.p-button-text.p-button-secondary {
  color: var(--bg-white) !important;
  font-weight: bold;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.p-button-text.p-button-secondary:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
}

.p-menubar {
  border: none !important;
  border-radius: 0 !important;
}

.p-button-secondary:hover {
  color: var(--text-dark) !important;
}
</style>
