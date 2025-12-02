<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const activeMenu = ref('dashboard'); // To track which button is blue

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Bansay App</q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-white text-grey-8">
      <div class="q-pa-md flex flex-center column bg-blue-1">
        <q-avatar size="80px" class="q-mb-sm shadow-2">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">System Administrator</div>
        <div class="text-caption text-grey-7">admin@bansay.edu.ph</div>
      </div>

      <q-list padding>
        <q-item-label header class="text-uppercase text-grey-6 text-weight-bold">Menu</q-item-label>

        <q-item
          clickable
          v-ripple
          :active="activeMenu === 'dashboard'"
          @click="activeMenu = 'dashboard'"
          active-class="bg-blue-1 text-primary"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="activeMenu === 'users'"
          @click="activeMenu = 'users'"
          active-class="bg-blue-1 text-primary"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>User Management</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="activeMenu === 'logs'"
          @click="activeMenu = 'logs'"
          active-class="bg-blue-1 text-primary"
        >
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>
          <q-item-section>System Logs</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
