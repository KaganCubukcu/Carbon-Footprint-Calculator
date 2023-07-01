<template>
  <div class="transport-container">
    <h1>Public transport carbon footprint calculator</h1>
    <div class="transport-section" v-for="(item, index) in items" :key="index">
      <label class="transport-label"> {{ item.label }}: </label>
      <input
        v-model.number="item.value"
        type="number"
        class="transport-input"
      />
    </div>
    <button @click="calculateCO2Footprint" class="transport-calculate-button">
      Calculate
    </button>
    <div v-if="co2Footprint !== null">
      <h2>Your carbon footprint is: {{ co2Footprint }} kg</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Co2TransportFootprintCalculator",
  setup() {
    const items = ref([
      {
        label: "Bus (in km)",
        value: null,
        co2PerUnit: 0.375,
      },
      {
        label: "Subway (in km)",
        value: null,
        co2PerUnit: 2.5,
      },
      {
        label: "Taxi (in km)",
        value: null,
        co2PerUnit: 1.8,
      },
    ]);

    const co2Footprint = ref<number | null>(null);

    function calculateCO2Footprint() {
      let totalCO2 = 0;
      for (const item of items.value) {
        totalCO2 += (item.value || 0) * item.co2PerUnit;
      }
      co2Footprint.value = totalCO2;
    }
    return {
      items,
      co2Footprint,
      calculateCO2Footprint,
    };
  },
});
</script>

<style scoped>
.transport-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.transport-section {
  padding: 14px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.transport-label {
  text-align: right;
  width: 200px;
}
.transport-input {
  width: 200px;
  height: 30px;
}
.transport-calculate-button {
  width: 200px;
  height: 45px;
  margin-top: 10px;
  background-color: #646cff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.transport-calculate-button:hover {
  background-color: #535bf2;
  transition: 0.5s ease-in-out;
}
</style>
