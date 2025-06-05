<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  plan: Object
});

const emit = defineEmits(['acquire']);
const { t } = useI18n();

const getPlanPrice = (price) => {
  if (price === 0) {
    return t('plans.free_plan_price');
  } else {
    if (props.plan.name === "Basic") {
      return t('plans.basic_plan_price');
    } else if (props.plan.name === "Premium") {
      return t('plans.premium_plan_price');
    }
    return `$${price.toFixed(2)}/month`;
  }
};
</script>

<template>
  <Card class="plan-card" :class="{ 'premium-plan': plan.name === 'Premium' }">
    <template #title>
      <div class="p-text-center">
        <h2 class="plan-name">{{ t(`plans.${plan.name.toLowerCase()}_plan_title`) }}</h2>
        <p class="plan-price">{{ getPlanPrice(plan.price) }}</p>
      </div>
    </template>
    <template #content>
      <ul class="plan-benefits">
        <li v-for="(benefit, index) in plan.benefits" :key="index" class="benefit-item">
          <i class="pi pi-check-circle" style="color: var(--primary-color);"></i>
          <span>{{ benefit }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <Button :label="t('plans.acquire_plan')" class="p-button-primary acquire-plan-button" @click="emit('acquire', plan.name)" />
    </template>
  </Card>
</template>

<style scoped>
.plan-card {
  width: 100%;
  max-width: 350px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--bg-white);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plan-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.plan-price {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.plan-benefits {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-medium);
}

.benefit-item i {
  margin-right: 0.75rem;
  font-size: 1.1rem;
  line-height: 1.2;
}

.plan-card .p-card-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.premium-plan {
  border-color: var(--black-color);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.premium-plan .plan-name {
  color: var(--black-color);
}

.premium-plan .acquire-plan-button {
  background-color: var(--black-color) !important;
  border-color: var(--black-color) !important;
}

.acquire-plan-button {
  border-radius: 8px !important;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
</style> 
