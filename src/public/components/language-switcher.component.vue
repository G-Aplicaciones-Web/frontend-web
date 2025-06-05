<script setup>
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';

const { locale } = useI18n();

const setLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <div class="language-switcher">
    <Button
        label="EN"
        :class="['p-button-sm language-button', { 'active': locale === 'en' }]"
        @click="setLanguage('en')"
    />
    <Button
        label="ES"
        :class="['p-button-sm language-button', { 'active': locale === 'es' }]"
        @click="setLanguage('es')"
    />
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  border: 1px solid var(--bg-white);
  border-radius: 8px;
  overflow: hidden;
}

.language-button {
  background-color: var(--secondary-color) !important;
  border: none !important;
  color: var(--bg-white) !important;
  padding: 0.5rem 1rem;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 0;
}

.language-button:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.language-button:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.language-button.active {
  background-color: var(--black-color) !important;
  color: var(--bg-white) !important;
}

.language-button:hover:not(.active) {
  background-color: #546E7A !important;
}
</style>
