<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-indigo-7">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>BANSAY Officer Panel</q-toolbar-title>
        <q-btn flat round icon="person" aria-label="Profile" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit q-pa-md">
        <div class="text-h5 q-mb-md">Officer Functions</div>

        <q-card class="dashboard-card q-mb-md" clickable v-ripple>
          <q-card-section>
            <div class="text-h6">Liability Management</div>
            <div class="text-caption text-grey-7">Add, edit, or cancel student liabilities.</div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :to="{ name: 'liability-management' }" label="Manage Liabilities" flat />
          </q-card-actions>
        </q-card>

        <q-card class="dashboard-card q-mb-md" clickable v-ripple>
          <q-card-section>
            <div class="text-h6">Appeal Review</div>
            <div class="text-caption text-grey-7">
              View and act on student reconsideration requests.
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :to="{ name: 'appeal-review' }" label="Review Appeals" flat />
          </q-card-actions>
        </q-card>

        <q-card class="dashboard-card q-mb-md" clickable v-ripple>
          <q-card-section>
            <div class="text-h6">Payment Verification</div>
            <div class="text-caption text-grey-7">
              Validate and clear submitted proofs of payment.
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :to="{ name: 'payment-verification' }" label="Verify Payments" flat />
          </q-card-actions>
        </q-card>

        <q-card class="dashboard-card q-mb-md" clickable v-ripple>
          <q-card-section>
            <div class="text-h6">Generate Reports</div>
            <div class="text-caption text-grey-7">
              Filter summaries of outstanding and collected fines.
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :to="{ name: 'officer-reports' }" label="Reports" flat />
          </q-card-actions>
        </q-card>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
