<template>
  <div class="container">
    <h3>Your Carbon Footprint</h3>
    <table>
      <tr>
        <th>Category</th>
        <th>CO2e (tonnes)</th>
      </tr>
      <tr>
        <td>House</td>
        <td>{{ houseFootprint }}</td>
      </tr>
      <tr>
        <td>Transport</td>
        <td>{{ transportFootprint }}</td>
      </tr>
      <tr>
        <td>Vehicle</td>
        <td>{{ vehicleFootprint }}</td>
      </tr>
      <tr class="total">
        <td>Total</td>
        <td>{{ results }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    let results = store.state.results.toFixed(2);
    let houseFootprint = store.state.co2HouseFootprint || 0;
    let transportFootprint = store.state.co2TransportFootprint || 0;
    let vehicleFootprint = store.state.co2VehicleFootprint || 0;

    return { results, houseFootprint, transportFootprint, vehicleFootprint };
  },
});
</script>

<style scoped>
.container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
table {
  border-collapse: collapse;
  margin-top: 20px;
  width: 500px;
}

th {
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #fff;
}

td {
  padding: 10px;
  border-bottom: 1px solid #fff;
}
.total {
  font-weight: bold;
  font-size: 20px;
}
</style>
