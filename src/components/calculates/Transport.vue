<template>
  <div class="calculator-container">
    <h1>Public Transport Carbon Footprint Calculator</h1>
    <div class="calculator-section" v-for="(item, index) in items" :key="index">
      <label class="calculator-label"> {{ item.label }}: </label>
      <input
        v-model.number="item.value"
        type="number"
        class="calculator-input"
      />
    </div>
    <button @click="calculateCO2Footprint" class="calculator-button">
      Calculate
    </button>
    <div v-if="co2TransportFootprint !== null">
      <h2>
        Your carbon footprint is: {{ co2TransportFootprint }} tonnes of CO2e
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Co2TransportFootprintCalculator",
  setup() {
    const store = useStore();
    const items = ref([
      {
        label: "Bus (in km)",
        value: null,
        co2PerUnit: 0.00013,
      },
      {
        label: "Subway (in km)",
        value: null,
        co2PerUnit: 0.000034,
      },
      {
        label: "Taxi (in km)",
        value: null,
        co2PerUnit: 0.00015,
      },
    ]);

    const co2TransportFootprint = ref<number | null>(null);

    function calculateCO2Footprint() {
      let totalCO2 = 0;
      for (const item of items.value) {
        totalCO2 += (item.value || 0) * item.co2PerUnit;
      }

      const roundedCO2 = totalCO2.toFixed(2);

      co2TransportFootprint.value = Number(roundedCO2);
      store.dispatch("updateCo2TransportFootprint", Number(roundedCO2));
    }

    return {
      items,
      co2TransportFootprint,
      calculateCO2Footprint,
    };
  },
});
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 24px;
  }
  .calculator-section {
    width: 100%;
  }
  .calculator-label {
    text-align: center;
  }
}
</style>
