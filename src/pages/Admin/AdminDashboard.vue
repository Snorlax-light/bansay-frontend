<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-red-8 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>Admin Dashboard</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawer" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit">
        <dev class="q-pa-md"></dev>
        <q-card
          class="dashboard-card q-mb-md"
          clickable
          v-ripple
          @click="selectCard('User Management')"
        ></q-card>
        <div class="col-12 col-md-4">
          <q-card class="dashboard-card">
            <q-card-section>
              <div class="text-h6">User Management</div>
              <div class="text-caption text-grey-7">Manage user accounts and permissions.</div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn color="red-8" label="Manage Users" flat />
            </q-card-actions>
          </q-card>
        </div>
        <q-card
          class="dashboard-card q-mb-md"
          clickable
          v-ripple
          @click="selectCard('System Settings')"
        ></q-card>
        <div class="col-12 col-md-4"></div>

        <q-card class="dashboard-card">
          <q-card-section>
            <div class="text-h6">System Settings</div>
            <div class="text-caption text-grey-7">Configure system preferences and settings.</div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn color="red-8" label="Settings" flat />
          </q-card-actions>
        </q-card>
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const leftDrawer = ref(false);

    function selectCard(name: string) {
      alert(`You clicked ${name}!`);
    }

    return { leftDrawer, selectCard };
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
