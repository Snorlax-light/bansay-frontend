<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green-8 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>Officer Dashboard</q-toolbar-title>
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <q-card class="dashboard-card q-mb-md">
            <q-card-section>
              <div class="text-h6">Add new liabilities</div>
              <div class="text-caption text-grey-7">Create and assign liabilities to students.</div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn color="green-8" label="Manage Liabilities" flat />
            </q-card-actions>
          </q-card>
        </div>
        <q-card class="dashboard-card q-mb-md">
          <q-card-section>
            <div class="text-h6">Verify submitted payments</div>
            <div class="text-caption text-grey-7">
              Review and approve student payment submissions.
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn color="green-8" label="Manage payments" flat />
          </q-card-actions>
        </q-card>
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';

export default defineComponent({
  name: 'OfficerDashboard',
  setup() {
    const leftDrawer = ref(false);

    function selectCard(name: string) {
      alert(`You clicked ${name}!`);
    }

    const authStore = useAuthStore();
    function logout() {
      authStore.logout();
    }

    return { leftDrawer, selectCard, logout };
  },
});
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
