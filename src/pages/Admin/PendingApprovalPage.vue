<template>
  <q-page class="q-pa-md">
    <q-card class="form-container">
      <q-card-section class="header-section">
        <div class="text-h5 text-primary text-weight-bold">Pending User Registrations</div>
      </q-card-section>

      <q-card-section class="content-area">
        <div class="users-container">
          <div class="users-grid">
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 0 auto;
}

.header-section {
  border-bottom: 1px solid #e0e0e0;
}

.content-area {
  min-height: 400px;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmin(280px, 1fr));
  gap: 16px;
}

.user-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
