<template>
  <div class="calculator-container">
    <h1>Household Carbon Footprint Calculator</h1>
    <div class="calculator-section" v-for="(item, index) in items" :key="index">
      <label class="calculator-label"> {{ item.label }}: </label>
      <input
        v-model.number="item.value"
        type="number"
        class="calculator-input"
      />
    </div>
    <button @click="calculateCO2HouseFootprint" class="calculator-button">
      Calculate
    </button>
    <div v-if="co2HouseFootprint !== null">
      <h2>Your carbon footprint is: {{ co2HouseFootprint }} tonnes of CO2e</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Co2HouseFootprintCalculator",
  setup() {
    const store = useStore();
    const items = ref([
      {
        label: "Electricity Used (in kWh)",
        value: null,
        co2PerUnit: 0.000375,
      },
      {
        label: "Coal Burned (in tons)",
        value: null,
        co2PerUnit: 2.88,
      },
      {
        label: "Wood Burned (in tons)",
        value: null,
        co2PerUnit: 0.05,
      },
    ]);

    const co2HouseFootprint = ref<number | null>(null);

    function calculateCO2HouseFootprint() {
      const totalCO2 = items.value.reduce((acc, item) => {
        const co2 = (item.value || 0) * item.co2PerUnit;
        return acc + co2;
      }, 0);

      const roundedCO2 = Number(totalCO2.toFixed(2));

      co2HouseFootprint.value = roundedCO2;
      store.dispatch("updateCo2HouseFootprint", roundedCO2);
    }

    return {
      items,
      co2HouseFootprint,
      calculateCO2HouseFootprint,
    };
  },
});
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .calculate-section {
    width: 100%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
