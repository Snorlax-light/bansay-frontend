<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  void authStore.fetchCurrentUser();
});
</script>
