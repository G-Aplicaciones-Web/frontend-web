<script setup>
import { useI18n } from 'vue-i18n';
import GuideStepCard from '../components/guides/GuideStepCard.component.vue';

const { t } = useI18n();

const guideSteps = [
  {
    step: 'Paso 1',
    titleKey: 'guides.step_1_title',
    textKey: 'guides.step_1_text'
  },
  {
    step: 'Paso 2',
    titleKey: 'guides.step_2_title',
    textKey: 'guides.step_2_text'
  },
  {
    step: 'Paso 3',
    titleKey: 'guides.step_3_title',
    textKey: 'guides.step_3_text'
  },
  {
    step: 'Paso 4',
    titleKey: 'guides.step_4_title',
    textKey: 'guides.step_4_text'
  },
  {
    step: 'Paso 5',
    titleKey: 'guides.step_5_title',
    textKey: 'guides.step_5_text'
  }
];
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-text-center p-mb-5">
      <h1>{{ t('guides.title') }}</h1>
      <p class="p-text-secondary">{{ t('guides.subtitle') }}</p>
    </div>

    <div class="p-card guide-section-card">
      <div class="p-card-header">
        <h2 class="p-mb-2">{{ t('guides.guide_title') }}</h2>
      </div>
      <div class="p-card-content">
        <div class="guide-steps-grid">
          <GuideStepCard
              v-for="(step, index) in guideSteps"
              :key="index"
              :step="step.step"
              :title="t(step.titleKey)"
              :text="t(step.textKey)"
              :stepNumber="index + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.p-text-center {
  text-align: center;
}

.p-mb-5 {
  margin-bottom: 3rem;
}

.p-text-secondary {
  color: var(--text-medium);
}

.guide-section-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.p-card-header {
  padding: 1.5rem;
  padding-bottom: 0;
}

.p-card-content {
  padding: 1.5rem;
}

.guide-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

@media (max-width: 768px) {
  .guide-steps-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>
