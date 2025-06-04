<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import GraphCard from '../components/home/GraphCard.component.vue';
import SuggestionCard from '../components/home/SuggestionCard.component.vue';
import api from '../services/api';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const toast = useToast();

const devices = ref([]);

const fetchDevices = async () => {
  try {
    const response = await api.get('/devices');
    devices.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('global_messages.error'),
      detail: t('devices.fetch_error') + error.message,
      life: 3000
    });
    console.error(t('devices.fetch_error'), error);
  }
};

const calculateAverages = () => {
  if (devices.value.length === 0) {
    return { avgVoltage: 0, avgCurrent: 0, avgPower: 0 };
  }

  const totalVoltage = devices.value.reduce((sum, device) => sum + (device.voltage || 0), 0);
  const totalCurrent = devices.value.reduce((sum, device) => sum + (device.current || 0), 0);
  const totalPower = devices.value.reduce((sum, device) => sum + (device.power || 0), 0);
  const connectedDevices = devices.value.filter(device => device.status === 'connected').length;

  return {
    avgVoltage: totalVoltage / devices.value.length,
    avgCurrent: totalCurrent / devices.value.length,
    avgPower: totalPower / devices.value.length,
    connectedDevicesCount: connectedDevices
  };
};

onMounted(fetchDevices);
const suggestions = [
  {
    image: 'bombilla_apagada.png',
    titleKey: 'home.tip_1_title',
    textKey: 'home.tip_1_text'
  },
  {
    image: 'electrodomestico.png',
    titleKey: 'home.tip_2_title',
    textKey: 'home.tip_2_text'
  },
  {
    image: 'enchufe.png',
    titleKey: 'home.tip_3_title',
    textKey: 'home.tip_3_text'
  },
  {
    image: 'led.png',
    titleKey: 'home.tip_4_title',
    textKey: 'home.tip_4_text'
  },
  {
    image: 'regleta.png',
    titleKey: 'home.tip_5_title',
    textKey: 'home.tip_5_text'
  },
  {
    image: 'reporte.png',
    titleKey: 'home.tip_6_title',
    textKey: 'home.tip_6_text'
  },
  {
    image: 'termostato.png',
    titleKey: 'home.tip_7_title',
    textKey: 'home.tip_7_text'
  },
  {
    image: 'ventana.png',
    titleKey: 'home.tip_8_title',
    textKey: 'home.tip_8_text'
  }
];
</script>

<template>
  <div class="p-container p-p-4">
    <div class="p-text-center p-mb-5">
      <h1>{{ t('home.welcome_title') }}</h1>
      <p class="p-text-secondary">{{ t('home.welcome_subtitle') }}</p>
    </div>

    <div class="p-card p-mb-5">
      <div class="p-card-header">
        <h2 class="p-mb-2">{{ t('home.performance_title') }}</h2>
        <p class="p-text-secondary">{{ t('home.performance_subtitle') }}</p>
      </div>
      <div class="p-card-content">
        <div class="p-grid p-justify-center p-gap-3">
          <GraphCard :label="t('home.voltage')" :value="calculateAverages().avgVoltage.toFixed(2)" unit="V" />
          <GraphCard :label="t('home.current')" :value="calculateAverages().avgCurrent.toFixed(2)" unit="A" />
          <GraphCard :label="t('home.power')" :value="calculateAverages().avgPower.toFixed(2)" unit="W" />
        </div>
      </div>
    </div>

    <div class="p-card">
      <div class="p-card-header">
        <h2 class="p-mb-2">{{ t('home.energy_saving_title') }}</h2>
        <p class="p-text-secondary">{{ t('home.energy_saving_subtitle') }}</p>
      </div>
      <div class="p-card-content">
        <div class="p-grid p-justify-center p-gap-3">
          <SuggestionCard
              v-for="(suggestion, index) in suggestions"
              :key="index"
              :image="suggestion.image"
              :title="t(suggestion.titleKey)"
              :text="t(suggestion.textKey)"
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

.p-mb-2 {
  margin-bottom: 0.5rem;
}

.p-text-secondary {
  color: var(--text-medium);
}

.p-card-header {
  padding: 1.5rem;
  padding-bottom: 0;
}

.p-card-content {
  padding: 1.5rem;
}

.p-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

@media (max-width: 768px) {
  .p-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
