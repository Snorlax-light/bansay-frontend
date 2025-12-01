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
          <div class="col-12 col-md-4">
            <q-card class="dashboard-card q-mb-md">
              <q-card-section>
                <div class="text-h6">Add new liabilities</div>
                <div class="text-caption text-grey-7">
                  Create and assign liabilities to students.
                </div>
              </q-card-section>
              <q-card-actions align="left">
                <q-btn color="green-8" label="Manage Liabilities" flat />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-md-4">
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
          </div>

          <div class="col-12 col-md-4">
            <q-card class="dashboard-card q-mb-md">
              <q-card-section>
                <div class="text-h6">Liabilities</div>
                <div class="text-caption text-grey-7">Show the list of all liabilities.</div>
              </q-card-section>
              <q-card-actions align="left">
                <q-btn color="green-8" label="View Liabilities" flat @click="viewLiabilities" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div v-if="showLiabilities">
        <q-table
          title="Liabilities"
          :rows="liabilityStore.liabilities"
          :columns="[
            { name: 'id', field: (row) => row.student.id, label: 'ID', sortable: false },
            {
              name: 'student',
              field: (row) => row.student.username,
              label: 'Student',
              sortable: true,
            },
            { name: 'type', field: 'type', label: 'Type', sortable: true },
            { name: 'amount', field: (row) => Number(row.amount), label: 'Amount', sortable: true },
            { name: 'status', field: 'status', label: 'Status', sortable: true },
            { name: 'dueDate', field: 'dueDate', label: 'Due Date', sortable: true },
          ]"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useLiabilityStore } from 'src/stores/liability-store';

const leftDrawer = ref(false);
const showLiabilities = ref(false);
const liabilityStore = useLiabilityStore();
const authStore = useAuthStore();

// Fetches the liability data.
async function viewLiabilities() {
  await liabilityStore.fetchAllLiabilities();
  leftDrawer.value = false;
  showLiabilities.value = true;
  await nextTick();
}

function logout() {
  authStore.logout();
}
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
</style>
