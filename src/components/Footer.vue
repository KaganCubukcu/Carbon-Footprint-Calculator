<template>
  <footer class="footer-container">
    <div class="footer-content">Created By Kağan Çubukçu</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  padding: 10px;
  justify-content: center;
}
</style>
