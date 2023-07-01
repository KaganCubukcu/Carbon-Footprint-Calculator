<template>
  <div>
    <h1>CO2 Footprint Calculator</h1>

    <div>
      <label>Electricity Used (in kWh):</label>
      <input v-model.number="electricityUsed" type="number" />
    </div>

    <div>
      <label>Coal Burned (in kg):</label>
      <input v-model.number="coalBurned" type="number" />
    </div>

    <div>
      <label>Wood Burned (in kg):</label>
      <input v-model.number="woodBurned" type="number" />
    </div>

    <button @click="calculateCO2Footprint">Calculate CO2 Footprint</button>

    <div v-if="co2Footprint !== null">
      <h2>Your CO2 Footprint is: {{ co2Footprint }} kg</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Co2HouseFootprintCalculator",
  setup() {
    const electricityUsed = ref<number | null>(null);
    const coalBurned = ref<number | null>(null);
    const woodBurned = ref<number | null>(null);
    const co2Footprint = ref<number | null>(null);

    function calculateCO2Footprint() {
      const co2PerKwh = 0.375;
      const co2PerKgCoal = 2.5;
      const co2PerKgWood = 1.8;
      let electricityCO2 = (electricityUsed.value || 0) * co2PerKwh;
      let coalCO2 = (coalBurned.value || 0) * co2PerKgCoal;
      let woodCO2 = (woodBurned.value || 0) * co2PerKgWood;

      co2Footprint.value = electricityCO2 + coalCO2 + woodCO2;
    }
    return {
      electricityUsed,
      coalBurned,
      woodBurned,
      co2Footprint,
      calculateCO2Footprint,
    };
  },
});
</script>

<style scoped></style>
