<template>
  <div class="house-container">
    <h1>Household Carbon Footprint Calculator</h1>
    <div class="house-section" v-for="(item, index) in items" :key="index">
      <label class="house-label"> {{ item.label }}: </label>
      <input v-model.number="item.value" type="number" class="house-input" />
    </div>
    <button @click="calculateCO2HouseFootprint" class="house-calculate-button">
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
.house-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.house-section {
  padding: 14px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.house-label {
  text-align: right;
  width: 200px;
}
.house-input {
  width: 200px;
  height: 30px;
}
.house-calculate-button {
  width: 200px;
  height: 45px;
  margin-top: 10px;
  background-color: #646cff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.house-calculate-button:hover {
  background-color: #535bf2;
  transition: 0.5s ease-in-out;
}
@media only screen and (max-width: 600px) {
  .house-section {
    width: 100%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
