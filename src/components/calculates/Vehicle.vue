<template>
  <div class="vehicle-container">
    <h1>Vehicle Carbon Footprint Calculator</h1>
    <div class="vehicle-section-container">
      <div class="vehicle-section" v-for="(item, index) in items" :key="index">
        <label for="" class="vehicle-label">{{ item.label }}:</label>
        <select v-if="item.options" v-model="item.value" class="vehicle-select">
          <option disabled value="">Please select one</option>
          <option v-for="(option, index) in item.options" :key="index">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="mileage-section">
        <label class="vehicle-label">Mileage (in km): </label>
        <input v-model.number="mileage" type="number" class="vehicle-input" />
      </div>
    </div>
    <button @click="calculateVehicleFootprint" class="vehicle-calculate-button">
      Calculate
    </button>
    <div v-if="co2Footprint !== null">
      <h2>Your Carbon footprint is: {{ co2Footprint }} kg</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Co2VehicleFootprintCalculator",
  setup() {
    const items = ref([
      {
        label: "Vehicle Type",
        value: "",
        options: ["Van", "Motorcycle", "Car"],
      },
      {
        label: "Fuel Type",
        value: "",
        options: ["Diesel", "LPG", "Petrol"],
      },
    ]);
    const mileage = ref<number | null>(null);
    const co2Footprint = ref<number | null>(null);

    function calculateVehicleFootprint() {
      let mileageVal = mileage.value || 0;
      let co2OperUnit = 0;

      switch (items.value[1].value) {
        case "Diesel":
          co2OperUnit = 2.7;
          break;
        case "LPG":
          co2OperUnit = 1.5;
          break;
        case "Petrol":
          co2OperUnit = 2.9;
          break;
      }
      co2Footprint.value = mileageVal * co2OperUnit;
    }

    return {
      items,
      mileage,
      co2Footprint,
      calculateVehicleFootprint,
    };
  },
});
</script>

<style scoped>
.vehicle-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.vehicle-section-container {
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
}
.vehicle-section {
  padding: 14px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.vehicle-label {
  text-align: center;
  width: 200px;
}
.vehicle-input {
  width: 200px;
  height: 30px;
  margin-left: 30px;
}
.vehicle-calculate-button {
  width: 200px;
  height: 45px;
  margin-top: 10px;
  background-color: #646cff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.vehicle-calculate-button:hover {
  background-color: #535bf2;
  transition: 0.5s ease-in-out;
}
.vehicle-select {
  width: 200px;
  height: 30px;
}
.mileage-section {
  display: flex;
  padding: 14px;
  align-items: center;
}
</style>
