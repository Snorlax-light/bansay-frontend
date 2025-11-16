<template>
  <q-page class="bg-grey-1 flex flex-center">
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome, Student!</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StudentDashboard',
});
</script>

<style scoped>
h1 {
  color: #1e40af;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 10px;
  font-size: small;
}
p {
  text-align: left;
  color: #333;
}
</style>
