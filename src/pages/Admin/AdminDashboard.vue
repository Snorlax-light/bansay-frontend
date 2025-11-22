<template>
<<<<<<< HEAD
  <!-- The q-layout acts as the container for this specific dashboard view -->
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <!-- HEADER -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"></q-btn>

        <q-toolbar-title>
          <q-avatar
            size="32px"
            class="q-mr-sm"
            color="white"
            text-color="primary"
            icon="admin_panel_settings"
          ></q-avatar>
          BANSAY Admin
        </q-toolbar-title>

        <q-space></q-space>

        <!-- User Profile Dropdown -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>2</q-badge>
          </q-btn>
          <q-btn flat no-caps>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <span class="q-ml-sm">Admin User</span>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- LEFT SIDEBAR (DRAWER) -->
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
            <q-icon name="dashboard"></q-icon>
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
            <q-icon name="people"></q-icon>
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
            <q-icon name="receipt_long"></q-icon>
          </q-item-section>
          <q-item-section>System Logs</q-item-section>
        </q-item>

        <q-separator class="q-my-md"></q-separator>

        <q-item
          clickable
          v-ripple
          :active="activeMenu === 'settings'"
          @click="activeMenu = 'settings'"
          active-class="bg-blue-1 text-primary"
        >
          <q-item-section avatar>
            <q-icon name="settings"></q-icon>
          </q-item-section>
          <q-item-section>Configuration</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MAIN CONTENT -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Dashboard Title -->
        <div class="row q-mb-md items-center">
          <div class="col">
            <div class="text-h5 text-blue-10 text-weight-bold">Dashboard Overview</div>
            <div class="text-subtitle2 text-grey-7">Welcome back, Administrator!</div>
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="add" label="New Liability" no-caps unelevated></q-btn>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-12 col-sm-6 col-md-4">
            <q-card class="my-card text-white bg-gradient-blue">
              <q-card-section>
                <div class="text-h6">Total Students</div>
                <div class="text-h3 text-weight-bolder q-mt-sm">1,245</div>
              </q-card-section>
              <q-card-section class="row items-center justify-end q-pt-none">
                <q-icon name="school" size="4em" style="opacity: 0.3"></q-icon>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <q-card class="my-card bg-white text-primary shadow-2">
              <q-card-section>
                <div class="text-h6 text-grey-8">Active Liabilities</div>
                <div class="text-h3 text-weight-bolder text-red-8 q-mt-sm">₱ 45,200</div>
              </q-card-section>
              <q-card-section class="row items-center justify-end q-pt-none">
                <q-icon name="money_off" color="red-8" size="4em" style="opacity: 0.2"></q-icon>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <q-card class="my-card bg-white text-primary shadow-2">
              <q-card-section>
                <div class="text-h6 text-grey-8">Pending Appeals</div>
                <div class="text-h3 text-weight-bolder text-orange-8 q-mt-sm">18</div>
              </q-card-section>
              <q-card-section class="row items-center justify-end q-pt-none">
                <q-icon
                  name="pending_actions"
                  color="orange-8"
                  size="4em"
                  style="opacity: 0.2"
                ></q-icon>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- User Management Table Section -->
        <q-card class="shadow-2">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-blue-9">User Management</div>
            <q-space></q-space>
            <q-input
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search User..."
              color="primary"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
            <q-btn color="primary" icon="person_add" label="Add User" flat class="q-ml-md"></q-btn>
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="users"
              :columns="columns"
              row-key="id"
              :filter="filter"
              flat
              bordered
              :pagination="pagination"
            >
              <!-- Custom Status Column -->
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge :color="props.row.status === 'Active' ? 'green' : 'red'">
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
              </template>

              <!-- Action Buttons Column -->
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn flat round color="blue" icon="edit" size="sm">
                    <q-tooltip>Edit User</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="block"
                    size="sm"
                    @click="deactivateUser(props.row)"
                  >
                    <q-tooltip>Deactivate</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, type QTableColumn } from 'quasar';

// Define Types for your Data (TypeScript Best Practice)
interface User {
  id: number;
  studentId: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

// Variables
const $q = useQuasar();
const leftDrawerOpen = ref(false);
const activeMenu = ref('dashboard');
const filter = ref('');

// Table Columns Configuration
// Note: We use 'studentId' for the actions field to satisfy TypeScript, even though we slot over it.
const columns: QTableColumn[] = [
  { name: 'id', align: 'left', label: 'ID Number', field: 'studentId', sortable: true },
  { name: 'name', align: 'left', label: 'Full Name', field: 'name', sortable: true },
  { name: 'role', align: 'left', label: 'Role', field: 'role', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'studentId' },
];

// Pagination Configuration
const pagination = ref({
  rowsPerPage: 5,
});

// Mock Data
const users = ref<User[]>([
  { id: 1, studentId: '2021-00123', name: 'Juan Dela Cruz', role: 'Student', status: 'Active' },
  { id: 2, studentId: '2020-04512', name: 'Maria Clara', role: 'Student', status: 'Active' },
  { id: 3, studentId: 'EMP-9921', name: 'Mr. Pedro Santos', role: 'Officer', status: 'Active' },
  {
    id: 4,
    studentId: '2022-00111',
    name: 'Crisostomo Ibarra',
    role: 'Student',
    status: 'Inactive',
  },
  { id: 5, studentId: 'EMP-1102', name: 'Ms. Sisa Baliw', role: 'Officer', status: 'Active' },
]);

// Functions
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function deactivateUser(row: User) {
  // Since we are in Quasar, we can use Dialogs instead of browser 'confirm'
  $q.dialog({
    title: 'Confirm Deactivation',
    message: `Are you sure you want to deactivate ${row.name}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    row.status = 'Inactive';
    $q.notify({
      color: 'negative',
      message: `${row.name} has been deactivated`,
      icon: 'report_off',
    });
  });
}
</script>

<style scoped>
/* Scoped styles only apply to this component */
.my-card {
  transition: transform 0.3s;
}
.my-card:hover {
  transform: translateY(-5px);
}
.bg-gradient-blue {
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
}
</style>
``
=======
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
>>>>>>> upstream/develop
