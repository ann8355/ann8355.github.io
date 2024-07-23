<template>
  <Bar :data="data" :options="options" />
</template>

<script lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, Line } from 'vue-chartjs';
import * as chartConfig from './chartConfig.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);

export default {
  name: 'App',
  components: {
    Bar,
  },
  data() {
    return chartConfig;
  },
};
</script>
