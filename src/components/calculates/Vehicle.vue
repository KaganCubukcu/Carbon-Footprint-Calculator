<template>
  <div class="calculator-container">
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
    <button @click="calculateVehicleFootprint" class="vcalculator-button">
      Calculate
    </button>
    <div v-if="co2VehicleFootprint !== null">
      <h2>
        Your Carbon footprint is: {{ co2VehicleFootprint }} tonnes of CO2e
      </h2>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Co2VehicleFootprintCalculator",
  setup() {
    const store = useStore();
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
    const co2VehicleFootprint = ref<number | null>(null);

    function calculateVehicleFootprint() {
      const mileageVal = mileage.value || 0;
      let co2perUnit = 0;
      let co2perKm = 0;

      switch (items.value[1].value) {
        case "Diesel":
          co2perUnit = 0.00268;
          break;
        case "LPG":
          co2perUnit = 0.00151;
          break;
        case "Petrol":
          co2perUnit = 0.00231;
          break;
      }

      switch (items.value[0].value) {
        case "Van":
          co2perKm = 0.25;
          break;
        case "Motorcycle":
          co2perKm = 0.083;
          break;
        case "Car":
          co2perKm = 0.111;
          break;
      }

      const co2Footprint = (mileageVal * co2perUnit * co2perKm).toFixed(2);

      co2VehicleFootprint.value = Number(co2Footprint);
      store.dispatch("updateCo2VehicleFootprint", Number(co2Footprint));
    }

    return {
      items,
      mileage,
      co2VehicleFootprint,
      calculateVehicleFootprint,
    };
  },
});
</script>

<style scoped>
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
.vehicle-select {
  width: 200px;
  height: 30px;
}
.mileage-section {
  display: flex;
  padding: 14px;
  align-items: center;
}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 24px;
  }
}
</style>
