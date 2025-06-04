<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const props = defineProps({
  company: Object,
  plans: Array
});

const emit = defineEmits(['edit', 'delete']);
const { t } = useI18n();

const companyPlan = computed(() => {
  return props.plans.find(p => p.id === props.company.planId);
});
</script>

<template>
  <Card class="company-card">
    <template #content>
      <div class="card-header-main">
        <img src="/images/empresa.png" :alt="t('companies.company_name')" class="company-image" />
        <div class="company-info-flex-grow">
          <div class="company-name-display">{{ company.name }}</div>
          <div class="company-email">{{ company.email }}</div>
        </div>
        <div class="card-actions">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-secondary" @click="emit('edit', company)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="emit('delete', company.id)" />
        </div>
      </div>
      <div class="card-body">
        <div class="company-plan">
          <strong>{{ t('companies.plan') }}:</strong> {{ companyPlan ? t(`plans.${companyPlan.name.toLowerCase()}_plan_title`) : 'N/A' }}
        </div>
        <div v-if="companyPlan" class="plan-benefits-section">
          <h4>{{ t('Plan Benefits') }}:</h4>
          <ul class="plan-benefits-list">
            <li v-for="(benefit, bIndex) in companyPlan.benefits" :key="bIndex" class="benefit-item">
              <i class="pi pi-check" style="color: var(--primary-color);"></i> {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.company-card {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: var(--bg-white);
  padding: 1rem;
}

.card-header-main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.company-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
}

.company-info-flex-grow {
  flex-grow: 1;
  min-width: 0;
}

.company-name-display {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company-email {
  font-size: 0.9rem;
  color: var(--text-medium);
}

.card-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
  align-items: center;
  padding-top: 5px;
}

.card-body {
  padding-top: 0.5rem;
}

.company-plan {
  font-size: 0.95rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.plan-benefits-section h4 {
  font-size: 1rem;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
}

.plan-benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 0.5rem;
}

.benefit-item i {
  margin-right: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.2;
  flex-shrink: 0;
}
</style>
