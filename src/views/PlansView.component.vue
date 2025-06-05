<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import api from '../services/api';
import PlanCard from '../components/plans/PlanCard.component.vue';
import Button from 'primevue/button';

const { t } = useI18n();
const toast = useToast();

const plans = ref([]);

const fetchPlans = async () => {
  try {
    const response = await api.get('/plans');
    plans.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('plans.fetch_error') + error.message,
      life: 3000
    });
    console.error(t('plans.fetch_error'), error);
  }
};

onMounted(fetchPlans);

const acquirePlan = (planName) => {
  toast.add({
    severity: 'info',
    summary: t('plans.select_plan'),
    detail: `${t('plans.acquire_plan')}: ${planName}`,
    life: 3000
  });
  console.log(`Plan ${planName} adquirido/seleccionado.`);
};
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-text-center p-mb-5">
      <h1>{{ t('plans.title') }}</h1>
      <p class="p-text-secondary">{{ t('plans.select_plan') }}</p>
    </div>

    <div class="p-grid p-justify-center p-gap-3">
      <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          @acquire="acquirePlan"
      />
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

.p-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

@media (max-width: 768px) {
  .p-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>
