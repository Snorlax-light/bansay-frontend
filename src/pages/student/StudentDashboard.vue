<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawer = !leftDrawer" />
        <q-toolbar-title>Student Dashboard</q-toolbar-title>
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <q-card
            class="dashboard-card q-mb-md bg-indigo text-white"
            clickable
            @click="selectSection('Overview')"
          >
            <q-card-section>
              <div class="text-h6">Overview</div>
            </q-card-section>
          </q-card>

          <q-card
            class="dashboard-card q-mb-md bg-indigo text-white"
            clickable
            @click="selectSection('My Liabilities')"
          >
            <q-card-section>
              <div class="text-h6">My Liabilities</div>
            </q-card-section>
          </q-card>

          <q-card
            class="dashboard-card q-mb-md bg-indigo text-white"
            clickable
            @click="selectSection('Submit Appeal')"
          >
            <q-card-section>
              <div class="text-h6">Submit Appeal</div>
            </q-card-section>
          </q-card>

          <q-card
            class="dashboard-card q-mb-md bg-indigo text-white"
            clickable
            @click="selectSection('My Record')"
          >
            <q-card-section>
              <div class="text-h6">My Record</div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <OverviewSection v-if="selectedSection === 'Overview'" />
        <LiabilitiesSection v-if="selectedSection === 'My Liabilities'" />
        <AppealSection v-if="selectedSection === 'Submit Appeal'" />
        <RecordSection v-if="selectedSection === 'My Record'" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import OverviewSection from 'src/components/OverviewSection.vue';
import LiabilitiesSection from 'src/components/LiabilitiesSection.vue';
import AppealSection from 'src/components/AppealSection.vue';
import RecordSection from 'src/components/MyRecordSection.vue';

const leftDrawer = ref(false);
const selectedSection = ref('Overview');

function selectSection(section: string) {
  selectedSection.value = section;
  leftDrawer.value = false;
}
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
