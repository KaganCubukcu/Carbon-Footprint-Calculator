<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import House from "./components/calculates/House.vue";
import Transport from "./components/calculates/Transport.vue";
import Vehicle from "./components/calculates/Vehicle.vue";

const activeComponent = ref("House");

const changedComponent = (componentName: string) => {
  activeComponent.value = componentName;
};
</script>

<template>
  <div>
    <Navbar />
    <div class="main-button-container">
      <button @click="changedComponent('House')">House</button>
      <button @click="changedComponent('Vehicle')">Vehicle</button>
      <button @click="changedComponent('Transport')">Transport</button>
    </div>
    <House v-if="activeComponent === 'House'" />
    <Vehicle v-if="activeComponent === 'Vehicle'" />
    <Transport v-if="activeComponent === 'Transport'" />
  </div>
</template>

<style scoped>
.main-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10%;
  padding: 15px;
  gap: 30px;
}
button {
  padding: 8px 16px;
  border-radius: 4px;
  background: none;
  border-color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: #646cff;
  transition: 0.5s ease-in-out;
}
</style>
