<template>
  <q-page>
    <div>
      <TopStudents />
    </div>
    <div>
      <TopLiabilities />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TopStudents from './widgets/TopStudents.vue';
import TopLiabilities from './widgets/TopLiabilities.vue';
</script>
